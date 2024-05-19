import { randomUUID } from 'crypto';

export default abstract class Entity<Props = any> {
  public readonly id: string;

  constructor(
    public readonly props: Props,
    id?: string,
  ) {
    this.id = id || randomUUID();
  }

  toJSON(): Required<{ id: string } & Props> {
    return {
      id: this.id,
      ...this.props,
    } as Required<{ id: string } & Props>;
  }
}
