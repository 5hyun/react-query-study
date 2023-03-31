import type { Treatment } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { useQuery } from 'react-query';

// for when we need a query function for useQuery
async function getTreatments(): Promise<Treatment[]> {
  const { data } = await axiosInstance.get('/treatments');
  return data;
}

export function useTreatments(): Treatment[] {
  // fallback을 기본 값으로 둬야 처음에 잠깐 빈 값이 나왔다가 데이터가 다 불러와지면 보여준다.
  const fallback = [];

  // key를 이런식으로 하면 오타를 낼 일이 없다.
  // 쿼리 키를 일관적으로 해야 캐시된 데이터를 캐시가 잘 제공할 수 있다.
  const { data = fallback } = useQuery(queryKeys.treatments, getTreatments, {});
  return data;
}
