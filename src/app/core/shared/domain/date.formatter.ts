export class DateFormatter {
  public static toISO(date: Date): string {
    return date.toISOString();
  }

  public static parse(date: string | number): Date {
    const parsedDate = new Date(Number(date) || date);

    if (isNaN(parsedDate.getTime())) {
      throw new Error(`Invalid date format: ${date}`);
    }

    return parsedDate;
  }
}
