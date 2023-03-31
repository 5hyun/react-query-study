import { QueryClient } from 'react-query';

import { createStandaloneToast } from '@chakra-ui/react';
import { theme } from '../theme';
import { inspect } from 'util';
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
    },
  },
});
