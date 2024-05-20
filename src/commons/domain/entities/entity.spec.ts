import { randomUUID } from 'crypto';
import Entity from './entity';

jest.mock('crypto', () => ({
  randomUUID: jest.fn().mockReturnValue('generated-uuid'),
}));

class StubEntity extends Entity {
  constructor(props: any, id?: string) {
    super(props, id);
  }
}

describe('Entity', () => {
  let props;
  let entity;

  beforeEach(() => {
    props = { key: 'value' };
  });

  it('should create an instance with provided id', () => {
    entity = new StubEntity(props, 'custom-id');
    expect(entity.id).toBe('custom-id');
    expect(entity.props).toEqual(props);
  });

  it('should create an instance with generated id if id is not provided', () => {
    entity = new StubEntity(props);
    expect(entity.id).toBe('generated-uuid');
    expect(entity.props).toEqual(props);
  });

  it('should return a JSON representation with toJSON method', () => {
    entity = new StubEntity(props, 'custom-id');
    const json = entity.toJSON();
    expect(json).toEqual({ id: 'custom-id', key: 'value' });
  });

  it('should include the generated id in the JSON representation', () => {
    entity = new StubEntity(props);
    const json = entity.toJSON();
    expect(json).toEqual({ id: 'generated-uuid', key: 'value' });
  });
});
