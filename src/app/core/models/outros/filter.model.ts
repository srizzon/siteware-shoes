import { ConstantModel } from './constant.model';
import { FilterTypeEnum } from '@enums/filter-type.enum';

export class FilterModel {
  /**
   * @description Tipo de filtro;
   */
  filterType:
    FilterTypeEnum.CHECKBOX |
    FilterTypeEnum.CURRENCY |
    FilterTypeEnum.DATE |
    FilterTypeEnum.EXAM_TYPE |
    FilterTypeEnum.LOCAL_EXAME |
    FilterTypeEnum.NUMBER |
    FilterTypeEnum.RADIOBOX |
    FilterTypeEnum.SELECT |
    FilterTypeEnum.TEXT;

  /**
   * @description parametro que sera retornado com o value. Coloque o valor do query params que a api espera
   */
  param: string;

  /**
   * @description Label que sera utilizado no input
   */
  label: string;

  /**
   * @description Valor MÁXIMO permitido no input. APENAS PARA FILTERTYPE TEXT E NUMBER
   */
  maxlength?: number;

  /**
   * @description Valor MÍNIMO necessário para o input. APENAS PARA FILTERTYPE TEXT E NUMBER
   */
  minlength?: number;

  /**
   * @description Máscara aplicada ao input enquanto digitação. APENAS PARA FILTERTYPE TEXT
   */
  mask?: string;

  /**
   * @description Flag que envia os caracteres especiais após o envio do form. APENAS PARA FILTERTYPE TEXT COM NGX-MASK
   */
   sendSpecialCharacters?: boolean;
  
  /**
    * @description Se o filtro for exibido apenas para algum perfil. Informar o nome do perfil.
    */
  permission?: string;

  /**
    * @description Valores que vai popular o SELECT. Apenas para  FilterTypeEnum.SELECT
    */
  selectData?: ConstantModel[];

  /**
    * @description Valores que vai popular o SELECT. Apenas para  FilterTypeEnum.SELECT
    */
  typeSelectReturn?: 'ENUM_NAME' | 'ENUM_ID'

}