import Entity from '../../commons/entities/entity';

export type ProducerProperties = {
  document: string;
  producer_name: string;
  farm_name: string;
  city: string;
  state: string;
  total_area: Number;
  arable_area: Number;
  vegetation_area: Number;
  plantation: string[];
  created_at?: Date;
  updated_at?: Date;
};

export class Producer extends Entity<ProducerProperties> {
  private readonly _document: string;
  private readonly _producer_name: string;
  private readonly _farm_name: string;
  private readonly _city: string;
  private readonly _state: string;
  private readonly _total_area: Number;
  private readonly _arable_area: Number;
  private readonly _vegetation_area: Number;
  private readonly _plantation: string[];
  private readonly _created_at?: Date;
  private readonly _updated_at?: Date;

  constructor(props: ProducerProperties, id?: string) {
    super(props, id);
    this._document = props.document;
    this._producer_name = props.producer_name;
    this._farm_name = props.farm_name;
    this._city = props.city;
    this._state = props.state;
    this._total_area = props.total_area;
    this._arable_area = props.arable_area;
    this._vegetation_area = props.vegetation_area;
    this._plantation = props.plantation;
    this._created_at = props.created_at ?? new Date();
    this._updated_at = props.updated_at ?? new Date();
  }

  get document() {
    return this._document;
  }
  get producer_name() {
    return this._producer_name;
  }
  get farm_name() {
    return this._farm_name;
  }
  get city() {
    return this._city;
  }
  get state() {
    return this._state;
  }
  get total_area() {
    return this._total_area;
  }
  get arable_area() {
    return this._arable_area;
  }
  get vegetation_area() {
    return this._vegetation_area;
  }
  get plantation() {
    return this._plantation;
  }
  get created_at() {
    return this._created_at;
  }
  get updated_at() {
    return this._updated_at;
  }

  _validate(): void {
    throw new Error('Method not implemented.');
  }
}
