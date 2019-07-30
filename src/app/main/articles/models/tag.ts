export class Tag {
  id: number;
  name: string;
  created_on: Date;
  slug: string;

  constructor(createdOn: Date) {
    this.created_on = createdOn;
  }
}
