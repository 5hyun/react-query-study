import { Icon, Stack, Text } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { GiFlowerPot } from 'react-icons/gi';

import { BackgroundImage } from '../common/BackgroundImage';
import { usePrefetchTreatments } from '../treatments/hooks/useTreatments';

export function Home(): ReactElement {
  // home 컴포넌트는 동적이지 않아서 리렌더가 많이 일어나지 않는다.
  // 만약 리렌더가 걱정되면 이 커스텀 훅에 가서 staleTime, cacheTime을 관리해 줄 몇 가지 옵션을 주면된다.
  // 그러면 모든 트리거마다 리페칭하지 않아도 된다.
  // useEffect로 리렌더를 막기엔 useEffect 안에서 hook을 못쓴다.
  usePrefetchTreatments();

  return (
    <Stack textAlign="center" justify="center" height="84vh">
      <BackgroundImage />
      <Text textAlign="center" fontFamily="Forum, sans-serif" fontSize="6em">
        <Icon m={4} verticalAlign="top" as={GiFlowerPot} />
        Lazy Days Spa
      </Text>
      <Text>Hours: limited</Text>
      <Text>Address: nearby</Text>
    </Stack>
  );
}
