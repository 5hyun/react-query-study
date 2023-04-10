import { createStandaloneToast } from '@chakra-ui/react';
import { QueryClient } from 'react-query';
import { inspect } from 'util';

import { theme } from '../theme';
import defaultOptions = module;

const toast = createStandaloneToast({ theme });

// 에러처리 중앙화
function queryErrorHandler(error: unknown): void {
  // error is type unknown because in js, anything can be an error (e.g. throw(5))
  // error이 Error 클래스의 인스턴스인지에 따라 비슷한 방식으로 이름을 정하도록 했다.
  const title =
    error instanceof Error ? error.message : 'error connecting to server';

  // prevent duplicate toasts
  toast.closeAll();
  toast({ title, status: 'error', variant: 'subtle', isClosable: true });
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,
      // 리패칭 제한
      //  만료 타임이 캐싱 타임보다 길다는 것은 말이 안된다. 왜냐하면 만료된 데이터를 불러오는 동안 캐싱된 데이터를 보여주기 때문이다.
      // 따라서 staleTime은 cacheTime보다 작아야한다. 만약 staleTime이 더 크면 리패칭하는 동안 보야줄 데이터가 없을 것이다.
      staleTime: 600000, // 10분
      cacheTime: 900000, // 15분
      refetchOnMount: false, // 마운트(리렌더링)될 때 데이터를 다시 가져오지 않음
      refetchOnWindowFocus: false, // 브라우저를 포커싱했을때 데이터를 가져오지 않음
      refetchOnReconnect: false, // 네트워크가 다시 연결되었을때 다시 가져오지 않음
    },
    mutations: {
      onError: queryErrorHandler,
    },
  },
});
