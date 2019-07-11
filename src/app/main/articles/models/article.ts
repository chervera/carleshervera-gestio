export class Article {
  id: number;
  title: string;
  short_description: string;
  description: string;
  created_on: Date;
  active: boolean;
  slug: string;

  constructor(createdOn: Date) {
    this.created_on = createdOn;
  }
}
