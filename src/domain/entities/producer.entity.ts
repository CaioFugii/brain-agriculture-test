import Entity from '../../commons/domain/entities/entity';
import { ValidateCNPJ } from '../../commons/utils/validate-cnpj';
import { ValidateCPF } from '../../commons/utils/validate-cpf';

export type ProducerProperties = {
  document: string;
  producer_name: string;
  farm_name: string;
  city: string;
  state: string;
  total_area: number;
  arable_area: number;
  vegetation_area: number;
  plantation: string[];
  created_at?: Date;
  updated_at?: Date;
};

export class Producer extends Entity<ProducerProperties> {
  private _document: string;
  private _producer_name: string;
  private _farm_name: string;
  private _city: string;
  private _state: string;
  private _total_area: number;
  private _arable_area: number;
  private _vegetation_area: number;
  private _plantation: string[];
  private _created_at?: Date;
  private _updated_at?: Date;

  constructor(props: ProducerProperties, id?: string) {
    super(props, id);
    this._document = props.document;
    this._producer_name = props.producer_name;
    this._farm_name = props.farm_name;
    this._city = props.city;
    this._state = props.state;
    this._total_area = props.total_area ?? 0;
    this._arable_area = props.arable_area ?? 0;
    this._vegetation_area = props.vegetation_area ?? 0;
    this._plantation = props.plantation;
    this.props.created_at = props.created_at ?? new Date();
    this.props.updated_at = props.updated_at ?? new Date();
    this._validate();
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

  update(props: ProducerProperties) {
    this.props.document = props.document;
    this.props.producer_name = props.producer_name;
    this.props.farm_name = props.farm_name;
    this.props.city = props.city;
    this.props.state = props.state;
    this.props.total_area = props.total_area;
    this.props.arable_area = props.arable_area;
    this.props.vegetation_area = props.vegetation_area;
    this.props.plantation = props.plantation;
    this.props.updated_at = new Date();
    this._validate();
  }

  private _validate(): void {
    if (this.document === '') {
      throw new Error('document property should not be empty');
    }

    if (
      this.document.replace(/[^\d]+/g, '').length === 14 &&
      !ValidateCNPJ(this.document)
    ) {
      throw new Error('Invalid CNPJ');
    }

    if (
      this.document.replace(/[^\d]+/g, '').length === 11 &&
      !ValidateCPF(this.document)
    ) {
      throw new Error('Invalid CPF');
    }

    if (this.producer_name === '') {
      throw new Error('producer_name property should not be empty');
    }
    if (this.farm_name === '') {
      throw new Error('farm_name property should not be empty');
    }
    if (this.state === '') {
      throw new Error('state property should not be empty');
    }
    if (this.city === '') {
      throw new Error('city property should not be empty');
    }
    if (this.plantation.length === 0) {
      throw new Error('plantation property should not be empty');
    }
    if (this.arable_area + this.vegetation_area > this.total_area) {
      throw new Error(
        'The sum of arable_area and vegetation_area should not exceed total_area',
      );
    }
  }
}
