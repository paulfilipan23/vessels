export interface IVessel {
  name: string;
  imo: number;
}
export interface LogEntry {
  arrival: string | null;
  createdDate: string;
  departure: string | null;
  isOmitted: boolean | null;
  updatedField: string;
}
export interface ShippingData {
  arrival: string;
  createdDate: string;
  departure: string;
  isOmitted: boolean;
  logEntries: LogEntry[];
  port: { id: string; name: string };
  service: string;
}
export interface PortsWithPortCalls {
  portName: string;
  nonOmittedCalls: number;
  omittedCalls: number;
  portCalls: ShippingData[];
}
export interface IVesselPortCalls {
  vessel: IVessel;
  portCalls: ShippingData[];
}

export interface IPortInfo {
  name: string;
  totalPortCalls: number;
  omittedPortCalls: number;
  nonOmittedPortCalls: number;
  portCalls?: ShippingData[];
  totalPortCallDuration?: string;
  totalPortCallDurationInMinutes: number;
  portCallDurationsMinutes: number[];
  // percentiles fifthPercentile, twentiethPercentile, fiftiethPercentile, seventyFifthPercentile, ninetiethPercentile
  percentiles?: {
    5: number;
    20: number;
    50: number;
    75: number;
    90: number;
  };
}

export interface IPortsWithPortCalls {
  [key: string]: PortsWithPortCalls;
}
