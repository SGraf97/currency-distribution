type TraceVariable = {
  File: string
  LineNumber: number
  Expression: string
}

type SourceCodeTaskRequest = {
  Type: 'SourceCode'
  SourceCode: {
    Object: 'SourceCode'
    Code: string
    Arguments: string
    Language: 'C' | 'C++'
  }
  Overrides?: {
    Core?: string
    TraceVariables?: TraceVariable[]
  }
}

type Core = {
  Object: 'Core'
  CoreID: string
  Owner: string
  Name: string
  Class: 'C0'
  Precision: number
  MemorySize: number
  Microarchitecture: 'Athens' | 'Zurich' | 'disable' | 'Reference'
  CorrelationTracking: 'Disable' | 'Autocorrelation'
  CreatedAt: number
  UpdatedAt: number
}
