import { useLocation } from 'react-router-dom';
import { DefaultSorterParam,  SortDirection, SortTypeName } from '../../const/const';
import {  getFieldFromSearch } from '../../utils/navigation-utils';
import { CommonSideForm } from '../common/common-style';
import { SorterItem } from './sorter-item/sorter-item';
import { SortFieldset } from './sorter-style';



/**
 * из url(search) достает limit и offset
 * @param search location.search
 * @returns - { status, yearTo, yearFrom, countryId, languageId }
 */

const getSorterParams = (search: string) => {
  const direction = (getFieldFromSearch({ field: 'direction', search }) as string) || DefaultSorterParam.Direction;
  const type = (getFieldFromSearch({ field: 'type', search }) as string) || DefaultSorterParam.Type;
  return { direction, type};
};


export function Sorter( { types }: { types: string[] } ) {
  const { search } = useLocation();

  const { direction, type } = getSorterParams(search);

  const sortTypeElements = types.map((item) =>
    <SorterItem name='type' startValue={type} title={SortTypeName[item]} value={item} key={item}/>
  )


  return (
    <CommonSideForm>
      <SortFieldset>
        <legend>Направление сортировки</legend>
        <SorterItem startValue={direction} title='по возрастанию' value={SortDirection.ASC} key={SortDirection.ASC} name='direction'/>
        <SorterItem startValue={direction} title='по убыванию' value={SortDirection.DESC} key={SortDirection.DESC} name='direction'/>
      </SortFieldset>
      <SortFieldset>
        <legend>вид сортировки</legend>
        {sortTypeElements}
      </SortFieldset>

    </CommonSideForm>
  );
}
