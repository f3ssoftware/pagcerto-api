export class Split {
  method: SplitMethod;
  receivers: SplitReceiver[];
}

enum SplitMethod {
  FIXED = 'FIXED',
  PERCENTAGE = 'PERCENTAGE',
}

class SplitReceiver {
  id: string;
  value: number;
}
