import { TablePipesTypeEnum } from '@enums/table-pipes-types.enum';
import { TableColumnTypeEnum } from '@enums/table-column-type.enum';
export class TableCustom {

  /**
   * @description Nome da classe que será aplicada à div externa da tabela
   */

  class?: string;

  /**
   * @description Array com o nome dos itens da coluna
   */
  columns: Array<string>;

  /**
   * @description Array com os dados que popularão a tabela
   */
  data?: Array<any>;

  /**
   * @description Informar para esconder ou ocultar o filtro.
   */
  displayFilter?: boolean;

  /**
  * @description Informar para esconder ou ocultar o filtro.
  */
  displayPaginator?: boolean;

  /**
   * @description Elemento que vai ser lido como o datasource da tabela expansiva. Deve ser um componente do elemento do array de objetos do datasource da tabela externa.
   */
  elementExpansionDataTable?: string;

  /**
   * @description Valores para serem exibidos quando não exister dados na tablea.
   */
  result: {
    /**
     * @description Mensagem exibida quando carrega a tela a primeira vez
     */
    defaultMessage: string;

    /**
     * @description Mensagem exibida quando realiza um filtro e não retorna valor
     */
    noData: string;
  }

  /**
   * @description Permite ordenação na tabela (apenas para a TableCustomPaginator)
   */
  orderBy?: boolean;

  /**
   * @description Tamanho inicial da tabela (default é 5)
   */
  pageSize?: number;

  /**
   * @description Subtitulo da tabela
   * */
  subTitle?: string;

  /**
   * @description Título da tabela
   * */
  title?: string;

  /**
 * @description Caso o valor necessite de alguma transformação, passar a função calback aqui. (Deve implementar a função no helper e chamar ela aqui.)
 * */
  transformData?: (data?) => any;

  /**
   * @description Tamanho da tabela. Utilizar apenas números pares e não arredondados nas dezenas, caso não seja 100. Por exemplo, se quiser usar 80, use 82
   * */
  width?: string;

  columnData: {
    [key: string]: {

      /**
       * @description Tipo do item da coluna
       * */
      type?: TableColumnTypeEnum.BUTTONS |
             TableColumnTypeEnum.OBJECT |
             TableColumnTypeEnum.STRING;

      /**
       * @description Valor que vai do item que vai ser lido no data table
       * */
      element?: string;

      /**
       * @description Header da coluna
       * */
      header?: string;

      /**
       * @description Pipe aplicado ao item da coluna. Para usar um pipe, o tipo tem que ser string. */
      pipe?: TablePipesTypeEnum.CNPJ |
             TablePipesTypeEnum.CPF |
             TablePipesTypeEnum.CURRENCY |
             TablePipesTypeEnum.DATE |
             TablePipesTypeEnum.DATE_AND_TIME |
             TablePipesTypeEnum.DATE_TO_FRONT |
             TablePipesTypeEnum.FORMAT_NAME |
             TablePipesTypeEnum.REMOVE_UNDERSCORE |
             TablePipesTypeEnum.SITUATION_REGISTRATION |
             TablePipesTypeEnum.SITUATION_PAYMENT |
             TablePipesTypeEnum.TIME_TO_FRONT |
             TablePipesTypeEnum.TRUE_FALSE |
             TablePipesTypeEnum.TYPE_RELEASE;

      /**
       * @description Objeto com algum style que queira aplicar ao item da coluna (falta implementar)
       */
      style?: string;

      /**
       * @description caso o item da coluna seja butom, informar o tipo do botão.
       */
      buttonType?: 'icons' |
      'link' |
      'raised' |
      'stroked';

      /**
       * @description valores dos botões
       */
      buttons?:
      {
        /**
         * @description Informar o label caso o tipo do botão seja stroked ou raised
         */
        label?: string | null;

        /**
         * @description Informar o link caso o tipo do botão seja link
         */
        link?: string | null;

        /**@description Informar o icon caso o tipo do botão seja icons */
        icon?: string | null;

        /**
         * @description Informar a cor do texto caso queira
         */
        color?: string | null;


        /**
         * @description Mensagem do tooltip
         */
        tooltip?: string;

        /**
         * @description Função  callback ao clicar no botão
         */
        onClick?: (data, event?) => void;

        /**
        * @description Função  callback para desabilitar o botão
        */
        disabled?: (data) => any;
      }[];
    }
  };
}
