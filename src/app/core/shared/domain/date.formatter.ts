export class DateFormatter {
  public static format(date: Date): string {
    return date.toUTCString();
  }

  public static parse(date: string | number): Date {
    const timestamp = Number(date);
    if (isNaN(timestamp)) {
      throw new Error(`Invalid date format: ${date}`);
    }
    return new Date(timestamp);
  }
}
