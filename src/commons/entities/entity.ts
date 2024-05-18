import { randomUUID } from 'crypto';

export default abstract class Entity<Props = any> {
  public readonly uniqueEntityId: string;

  constructor(
    public readonly props: Props,
    id?: string,
  ) {
    this.uniqueEntityId = id || randomUUID();
  }

  get id() {
    return this.uniqueEntityId;
  }

  toJSON(): Required<{ id: string } & Props> {
    return {
      id: this.id,
      ...this.props,
    } as Required<{ id: string } & Props>;
  }

  abstract _validate(): void;
}
