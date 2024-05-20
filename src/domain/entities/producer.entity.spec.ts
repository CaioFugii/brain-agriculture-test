import { Producer, ProducerProperties } from './producer.entity';

describe('Producer', () => {
  let producerProps: ProducerProperties;

  beforeEach(() => {
    producerProps = {
      document: '52734151014',
      producer_name: 'John Doe',
      farm_name: 'Happy Farm',
      city: 'Farmville',
      state: 'FV',
      total_area: 100,
      arable_area: 50,
      vegetation_area: 50,
      plantation: ['milho', 'soja'],
    };
  });

  it('should create a Producer instance with valid properties', () => {
    const producer = new Producer(producerProps);

    expect(producer.document).toBe(producerProps.document);
    expect(producer.producer_name).toBe(producerProps.producer_name);
    expect(producer.farm_name).toBe(producerProps.farm_name);
    expect(producer.city).toBe(producerProps.city);
    expect(producer.state).toBe(producerProps.state);
    expect(producer.total_area).toBe(producerProps.total_area);
    expect(producer.arable_area).toBe(producerProps.arable_area);
    expect(producer.vegetation_area).toBe(producerProps.vegetation_area);
    expect(producer.plantation).toEqual(
      producerProps.plantation.map((item) => item.toLowerCase()),
    );
  });

  it('should throw an error if document is empty', () => {
    producerProps.document = '';
    expect(() => new Producer(producerProps)).toThrow(
      'document property should not be empty',
    );
  });

  it('should throw an error if producer_name is empty', () => {
    producerProps.producer_name = '';
    expect(() => new Producer(producerProps)).toThrow(
      'producer_name property should not be empty',
    );
  });

  it('should throw an error if farm_name is empty', () => {
    producerProps.farm_name = '';
    expect(() => new Producer(producerProps)).toThrow(
      'farm_name property should not be empty',
    );
  });

  it('should throw an error if city is empty', () => {
    producerProps.city = '';
    expect(() => new Producer(producerProps)).toThrow(
      'city property should not be empty',
    );
  });

  it('should throw an error if state is empty', () => {
    producerProps.state = '';
    expect(() => new Producer(producerProps)).toThrow(
      'state property should not be empty',
    );
  });

  it('should throw an error if plantation is empty', () => {
    producerProps.plantation = [];
    expect(() => new Producer(producerProps)).toThrow(
      'plantation property should not be empty',
    );
  });

  it('should throw an error if arable_area + vegetation_area exceeds total_area', () => {
    producerProps.arable_area = 60;
    producerProps.vegetation_area = 50;
    expect(() => new Producer(producerProps)).toThrow(
      'The sum of arable_area and vegetation_area should not exceed total_area',
    );
  });

  it('should throw an error for invalid CNPJ', () => {
    producerProps.document = '12345678901234'; // CNPJ length
    expect(() => new Producer(producerProps)).toThrow('Invalid CNPJ');
  });

  it('should throw an error for invalid CPF', () => {
    producerProps.document = '12345678901'; // CPF length
    expect(() => new Producer(producerProps)).toThrow('Invalid CPF');
  });

  it('should update producer properties correctly', () => {
    const producer = new Producer(producerProps);
    const newProps = { ...producerProps, producer_name: 'Jane Doe' };

    producer.update(newProps);

    expect(producer.producer_name).toBe(newProps.producer_name);
    expect(producer.updated_at).not.toBe(producerProps.updated_at);
  });
});
