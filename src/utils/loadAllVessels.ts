import {
  IPortInfo,
  IVessel,
  PortsWithPortCalls,
  ShippingData,
} from "../interfaces";
import { loadVessel, loadVessels } from "../service";
import { calculatePercentiles } from "./utils";

async function loadVesselsAndPorts(): Promise<{
  [key: string]: PortsWithPortCalls;
}> {
  // Load all vessels
  const vessels = await loadVessels();

  // Load information for each vessel
  const vesselInfoPromises = vessels.map((vessel: IVessel) =>
    loadVessel(vessel.imo).then((vesselSchedule) => ({
      ...vesselSchedule,
    }))
  );

  // Wait for all promises to resolve
  const vesselInfo = await Promise.all(vesselInfoPromises);

  // group by port name
  const portCallsByPortName = vesselInfo.reduce<{
    [key: string]: PortsWithPortCalls;
  }>((acc, curr) => {
    curr.portCalls.forEach((portCall: ShippingData) => {
      const portId = portCall.port.id;
      if (!acc[portId]) {
        acc[portId] = {
          portName: portCall.port.name,
          nonOmittedCalls: 0,
          omittedCalls: 0,
          portCalls: [],
        };
      }
      acc[portId].portCalls = [...acc[portId].portCalls, portCall];
      if (portCall.isOmitted) {
        acc[portId].omittedCalls++;
      } else {
        acc[portId].nonOmittedCalls++;
      }
    });
    return acc;
  }, {});
  return portCallsByPortName;
}

async function topFiveAndBottomFivePorts() {
  const ports = await loadVesselsAndPorts();
  const portInfo: IPortInfo[] = Object.keys(ports).map((portId) => {
    const port: PortsWithPortCalls = ports[portId];

    const nonOmittedPortCalls = port.portCalls.filter(
      (call) => !call.isOmitted
    );
    const portCallDurations = nonOmittedPortCalls.map((call) => {
      const arrivalTime = new Date(call.arrival);
      const departureTime = new Date(call.departure);
      const portCallDuration = departureTime.getTime() - arrivalTime.getTime();
      return portCallDuration;
    });

    const totalPortCallDuration = portCallDurations.reduce(
      (total, duration) => total + duration,
      0
    );
    //calculate port call duration in minutes
    const portCallDurationsMinutes = portCallDurations
      .map((duration) => {
        return duration / 60000;
      })
      .sort((a, b) => a - b);
    const totalMinutes = Math.floor(totalPortCallDuration / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const percentiles = calculatePercentiles(portCallDurationsMinutes);

    return {
      name: port.portName,
      totalPortCalls: port.portCalls.length,
      omittedPortCalls: port.omittedCalls,
      nonOmittedPortCalls: port.nonOmittedCalls,
      totalPortCallDuration: `${hours}h ${minutes}m`,
      totalPortCallDurationInMinutes: totalMinutes || 0,
      portCallDurationsMinutes,
      percentiles,
    };
  });

  const sortedPortsByNonOmmitedPortCalls = [
    ...portInfo.sort((a, b) => {
      return b.nonOmittedPortCalls - a.nonOmittedPortCalls;
    }),
  ];
  const sortedPortsByDuration = [
    ...portInfo.sort((a, b) => {
      return (
        b.totalPortCallDurationInMinutes - a.totalPortCallDurationInMinutes
      );
    }),
  ];
  const topFivePorts = sortedPortsByNonOmmitedPortCalls.slice(0, 5);
  const bottomFivePorts = sortedPortsByNonOmmitedPortCalls.slice(-5);

  return {
    topFivePorts,
    bottomFivePorts,
    sortedPorts: sortedPortsByDuration,
    sortedPortsByNonOmmitedPortCalls,
  };
}

export { loadVesselsAndPorts, topFiveAndBottomFivePorts };
