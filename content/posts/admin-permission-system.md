---
title: "Admin 프로젝트의 다층 권한 관리 시스템 설계"
date: "2025-10-21"
author: "Dawoon"
excerpt: "B2B SaaS 서비스의 복잡한 권한 관리를 4단계 레이어로 설계한 실전 경험담. 라이선스와 역할의 조합, 다중 라이선스 보유, 계층적 업무 플로우를 처리하는 권한 시스템 구현 방법을 상세히 공유합니다."
tags: ["개발", "권한관리", "Admin", "React", "TypeScript", "Recoil"]
---

# Admin 프로젝트의 다층 권한 관리 시스템 설계

## 들어가며

B2B SaaS 서비스를 개발하다 보면 가장 복잡하면서도 중요한 부분 중 하나가 바로 **권한 관리 시스템**입니다. 사용자의 라이선스 타입(플랜)과 역할(Role)에 따라 페이지 접근부터 기능 사용, API 호출까지 세밀하게 제어해야 합니다.

이 글에서는 저희 Admin 프로젝트에서 구현한 **4단계 권한 관리 시스템**의 설계와 구현 방법을 공유하려고 합니다.

---

## 시스템 배경: Admin 프로젝트의 구조

본격적인 권한 관리 시스템 설명에 앞서, 저희 Admin 시스템의 구조를 먼저 이해해야 합니다. 저희 시스템은 **라이선스(License)**와 **역할(Role)**의 조합으로 사용자 권한을 관리합니다.

### 🎫 라이선스 체계 (4가지)

> 💡 **중요**: 사용자는 **여러 라이선스를 동시에 가질 수 있습니다**. 특히 Network와 Agent 라이선스는 중복으로 보유 가능합니다. 이것이 코드에서 `license`를 배열로 관리하는 이유입니다.

#### 1. Master 라이선스 - 전체 데이터 & 기능 사용

가장 강력한 라이선스로, 모든 데이터와 기능에 접근할 수 있습니다. 특이한 점은 **내부적으로 세부 역할(Role)이 나뉘어** 조직 계층을 구현한다는 점입니다.

**역할(Role) 구성:**

- **ROLE_MASTER**: 극히 일부 유저에게만 부여되는 최고 관리자 권한
  - 모든 기능을 제한 없이 사용
  - ROLE_AGENT 유저들에게 담당 회사/프로젝트 할당
- **ROLE_AGENT**: Master 라이선스 내에서 중간 관리자 역할
  - ROLE_MASTER로부터 담당 회사/프로젝트를 할당받음
  - Agent 라이선스 유저들에게 후보자를 작성하고 전달하는 역할

#### 2. Agent 라이선스 - 에이전트 기능 전용

에이전트 기능만 사용할 수 있는 제한된 라이선스입니다.

**특징:**

- **ROLE_ADMIN**: 고정 (모든 Agent 라이선스 유저는 ROLE_ADMIN)
- **Master 라이선스 유저들이 작성/전달한 후보자를 열람**
- 에이전트 관련 기능만 접근 가능

**중복 라이선스:**

- ✅ **Network 라이선스와 중복 보유 가능**: 한 사용자가 Agent + Network 라이선스를 동시에 가질 수 있음

#### 3. Network 라이선스 - 네트워크 기능 전용

네트워크(채용 후보자 탐색 및 관리) 기능만 사용할 수 있는 라이선스입니다.

**역할(Role) 구성:**

- **ROLE_ADMIN**: 네트워크 기능 전체 사용
- **ROLE_MANAGER**: ADMIN보다 제한된 기능만 사용 (일부 관리 기능 제한)

**중복 라이선스:**

- ✅ **Agent 라이선스와 중복 보유 가능**: 한 사용자가 Network + Agent 라이선스를 동시에 가질 수 있음

**레거시 세부 플랜 (현재 미사용):**

- `FULL`: 정액형
- `HYBRID`: 하이브리드형
- `PERCENT`: 수수료형

> 💡 참고: 코드에는 여전히 이 플랜들이 존재하지만, 비즈니스적으로는 더 이상 사용하지 않습니다. 하위 호환성을 위해 유지하고 있습니다.

#### 4. Free 라이선스 - 무료 체험 버전

서비스를 체험할 수 있는 무료 버전입니다.

**특징:**

- **ROLE_ADMIN**: 고정
- 제한된 기능으로 서비스 체험 가능
- 일부 기능 사용 시 유료 전환 유도 메시지 표시

### 🔄 업무 플로우 예시

Master 라이선스를 활용한 조직 구조의 실제 업무 플로우입니다:

```
┌─────────────────────────────────────────┐
│  ROLE_MASTER (Master 라이선스)          │
│  - 최고 관리자                           │
│  - 모든 기능 사용 가능                   │
└────────────┬────────────────────────────┘
             │ 프로젝트/회사 할당
             ↓
┌─────────────────────────────────────────┐
│  ROLE_AGENT (Master 라이선스)           │
│  - 할당받은 프로젝트 관리                │
│  - 후보자 작성 및 전달                   │
└────────────┬────────────────────────────┘
             │ 후보자 작성/전달
             ↓
┌─────────────────────────────────────────┐
│  Agent 라이선스 유저 (ROLE_ADMIN)       │
│  - 전달받은 후보자 열람                  │
│  - 에이전트 기능만 사용                  │
└─────────────────────────────────────────┘
```

### 🎯 권한 관리의 핵심 과제

이러한 구조에서 권한 관리 시스템이 해결해야 할 과제는:

1. **라이선스와 역할의 조합**: 단순히 라이선스만으로는 부족하고, 역할까지 함께 체크해야 함
2. **다중 라이선스 보유**: Network + Agent처럼 여러 라이선스를 동시에 가진 사용자 처리 (`license`가 배열인 이유)
3. **동일 라이선스 내 역할 구분**: Master 라이선스의 ROLE_MASTER와 ROLE_AGENT는 같은 라이선스지만 권한이 크게 다름
4. **계층적 업무 플로우**: Master → Agent 라이선스로 이어지는 데이터 흐름 제어
5. **레거시 호환성**: 더 이상 사용하지 않는 플랜(FULL, HYBRID, PERCENT)도 고려
6. **세밀한 기능 제어**: 같은 페이지 내에서도 버튼 단위로 다른 권한 적용

이러한 복잡한 요구사항을 해결하기 위해 저희는 **4단계 레이어 구조**를 설계했습니다.

## 권한 관리 시스템의 4가지 레이어

저희 시스템은 다음과 같은 4단계로 구성되어 있습니다:

```
1️⃣ 상태 관리 레이어 (State Layer)
   └─ userState + checkAccessSelector

2️⃣ 페이지 접근 레이어 (Page Access Layer)
   └─ CheckSalaryUser HOC + accessControlMap

3️⃣ API 권한 레이어 (API Permission Layer)
   └─ useQueriesMap

4️⃣ 기능 권한 레이어 (Feature Permission Layer)
   └─ useNetworkPermission
```

각 레이어를 자세히 살펴보겠습니다.

---

## 1️⃣ 상태 관리 레이어: 권한의 단일 진실 공급원

### userState: 사용자 권한 정보 저장소

```typescript
// services/admin/src/store/salary/userState.ts
const userState = atom<Omit<IBoltxOperator, "authorities">>({
  key: "admin_user_state",
  default: {
    id: "",
    companyName: "",
    email: "",
    name: "",
    license: ["FREE"], // 사용자의 라이선스 배열
    role: "ROLE_ADMIN", // 사용자의 역할
    subscriptionItems: [],
    // ... 기타 정보
  },
  effects_UNSTABLE: [persistAtom], // localStorage 영속화
});
```

**핵심 포인트:**

- `license`는 **배열 타입**으로 여러 라이선스를 동시에 가질 수 있습니다
  - 예: `['NETWORK', 'AGENT']` - Network와 Agent 기능을 모두 사용 가능
  - 예: `['MASTER']` - Master 기능만 사용
- `role`은 단일 값으로 하나의 역할만 가집니다
- `recoil-persist`를 사용해 localStorage에 영속화합니다

### checkAccessSelector: 권한 체크의 핵심 로직

```typescript
// services/admin/src/store/salary/RolelicesnsSelector.ts
interface condition {
  requiredRoles?: user_role[];
  requiredLicenses?: user_license[];
  condition?: "AND" | "OR"; // 기본값: 'AND'
}

export const checkAccessSelector = selector({
  key: "satisfiesConditionWithObjectSelector",
  get: ({ get }) => {
    const { license, role } = get(userState);

    return (condition: condition): boolean => {
      const {
        requiredRoles,
        requiredLicenses,
        condition: logic = "AND",
      } = condition;

      // Role 체크: 요구되는 role 중 하나라도 일치하면 통과
      const hasRole = requiredRoles
        ? requiredRoles.some((requiredRole) => role === requiredRole)
        : true;

      // License 체크: 요구되는 license 중 하나라도 소유하면 통과
      const hasLicense =
        requiredLicenses?.some((requiredLicense) =>
          license?.includes(requiredLicense)
        ) ?? true;

      // AND/OR 로직으로 최종 결과 반환
      return logic === "AND" ? hasRole && hasLicense : hasRole || hasLicense;
    };
  },
});
```

**설계의 핵심:**

- **함수를 반환하는 Selector**: `checkAccessSelector`는 함수를 반환하므로, 동적으로 다양한 조건을 체크할 수 있습니다
- **다중 라이선스 지원**:
  - `license?.includes(requiredLicense)`를 통해 배열에 포함 여부 체크
  - `['NETWORK', 'AGENT']`를 가진 사용자는 NETWORK 권한도, AGENT 권한도 통과
- **유연한 조건 체크**:
  - `requiredRoles`가 없으면 자동으로 `true` (role 체크 생략)
  - `requiredLicenses`가 없으면 자동으로 `true` (license 체크 생략)
- **AND/OR 로직 지원**: 상황에 따라 조건 결합 방식을 선택할 수 있습니다

### 자주 사용하는 권한 조건 상수화

```typescript
// services/admin/src/store/salary/RolelicesnsSelector.ts
export const isMaster = {
  requiredRoles: ["ROLE_MASTER"],
  requiredLicenses: ["MASTER"],
} as condition;

export const isNetwork = {
  requiredRoles: ["ROLE_ADMIN", "ROLE_MASTER", "ROLE_AGENT"],
  requiredLicenses: ["FULL", "HYBRID", "PERCENT", "MASTER"],
} as condition;

export const isFree = {
  requiredRoles: ["ROLE_ADMIN"],
  requiredLicenses: ["FREE"],
} as condition;
```

**장점:**

- 코드 재사용성 증가
- 권한 조건 변경 시 한 곳만 수정하면 됨
- 타입 안정성 확보

---

## 2️⃣ 페이지 접근 레이어: 라우트 가드

### accessControlMap: 페이지별 필요 권한 정의

```typescript
// services/admin/src/component/HOC/CheckSalaryUser/accessControlMap.tsx
export const accessControlMap: Record<pageName, AccessControl> = {
  network_card: {
    pathname: "/salary/network/[tab]",
    requiredRoles: ["ROLE_ADMIN", "ROLE_MASTER", "ROLE_AGENT"],
    requiredLicenses: [
      "FULL",
      "HYBRID",
      "MASTER",
      "PERCENT",
      "FREE",
      "AGENT",
      "TRIAL",
    ],
  },
  position: {
    pathname: "/salary/position",
    requiredRoles: ["ROLE_ADMIN", "ROLE_MASTER"],
    requiredLicenses: ["FULL", "HYBRID", "MASTER", "PERCENT", "FREE", "TRIAL"],
  },
  agent_manager_tab: {
    pathname: "/salary/agent_dashboard/[tab]",
    requiredRoles: ["ROLE_AGENT", "ROLE_MASTER"],
    requiredLicenses: ["MASTER"],
  },
  // ... 더 많은 페이지 정의
};
```

### CheckSalaryUser: HOC를 이용한 페이지 가드

```typescript
// services/admin/src/component/HOC/CheckSalaryUser/index.tsx
const CheckSalaryUser = ({
  pageName,
  children,
  isRouterReset,
}: {
  pageName?: pageName;
  children?: ReactNode;
  isRouterReset?: boolean;
}) => {
  const { authErrAlert } = useAlert();
  const { asPath, isReady, replace } = useRouter();
  const selector = useRecoilValue(checkAccessSelector);

  // 1. 사용자 데이터 조회
  const { isSuccess } = operatorUserDataQuery({
    enabled: true,
    onSuccess(data) {
      const { license, role } = data;

      // 초기 라우터 설정 (로그인 후 첫 페이지 결정)
      if (isRouterReset) {
        replace(findRedirectPath(license, role) || "/");
      }
    },
    onError(err: AxiosError) {
      authErrAlert(err.response.status);
    },
  });

  // 2. 페이지 접근 권한 체크
  useEffect(() => {
    if (pageName) {
      const accessControl: AccessControl = accessControlMap[pageName];

      if (
        !selector({
          requiredLicenses: accessControl.requiredLicenses,
          requiredRoles: accessControl.requiredRoles,
        })
      ) {
        replace("/"); // 접근 권한이 없으면 홈으로 리다이렉트
      }
    }
  }, [selector, replace, pageName]);

  // 3. 모바일 체크
  useEffect(() => {
    if (isMobile) {
      replace("/mobile");
    }
  }, [isMobile]);

  return <>{isSuccess ? children : <Loading />}</>;
};
```

**사용 예시:**

```tsx
// 페이지 컴포넌트에서
<CheckSalaryUser pageName="position">
  <PositionPage />
</CheckSalaryUser>

// 로그인 후 첫 페이지 결정 시
<CheckSalaryUser isRouterReset>
  <HomePage />
</CheckSalaryUser>
```

### routeMapping: 권한별 기본 페이지 설정

```typescript
// services/admin/src/component/HOC/CheckSalaryUser/routeMapping.ts
export const routeMapping = [
  {
    license: ["AGENT"],
    role: "ROLE_ADMIN",
    path: "/salary/agent",
  },
  {
    license: ["FULL", "PERCENT", "HYBRID"],
    role: "ROLE_MANAGER",
    path: "/salary/network/manager",
  },
  {
    license: ["FULL", "PERCENT", "HYBRID", "MASTER", "FREE", "TRIAL"],
    role: null,
    path: "/salary/network/users/card",
  },
];

export const findRedirectPath = (
  license: user_license[],
  role: user_role
): string | null => {
  for (const route of routeMapping) {
    const hasLicense =
      route.license?.some((lic) => license.includes(lic)) ?? true;
    const hasRole = route.role ? role === route.role : true;

    if (hasLicense && hasRole) {
      return route.path;
    }
  }
  return null;
};
```

**역할:**

- 사용자가 로그인했을 때 적절한 초기 페이지로 리다이렉트
- 권한에 맞는 첫 화면을 제공하여 UX 개선

---

## 3️⃣ API 권한 레이어: React Query 키 관리

### useQueriesMap: API별 권한 관리

```typescript
// services/admin/src/api/useQueriesMap.tsx
const useQueriesMap = () => {
  const selector = useRecoilValue(checkAccessSelector);

  // 공통 API key 및 enabled 설정
  const queriesMap = useMemo<{ [name in keyName]: apiOptions }>(() => {
    return {
      operatrorProfile: {
        key: "salary-operator-profile",
      },
      commonHeaderTab: {
        key: "common-header-tab",
        enabled:
          selector(isFree) ||
          selector(isNetwork) ||
          selector(isMasterAgent) ||
          selector(isNetworkManger),
      },
      itemsCard: {
        key: "items-card-list",
        enabled:
          selector(isFree) ||
          selector(isNetwork) ||
          selector(isMasterAgent) ||
          selector(isNetworkManger),
      },
      searchCodition: {
        key: "search-condition",
        enabled: selector({
          requiredLicenses: ["FULL", "HYBRID", "MASTER", "PERCENT"],
        }),
      },
    };
  }, [selector]);

  // 네트워크 관련 API
  const networkQueryMap = useMemo<{
    [name in networkkeyName]: apiOptions;
  }>(() => {
    return {
      networkUserProfile: {
        key: "network-user-prfile",
        enabled:
          selector(isNetwork) ||
          selector(isFree) ||
          selector(isNetworkManger) ||
          selector(isMasterAgent),
      },
      networkTableList: {
        key: "network-table-list",
        enabled:
          selector(isNetwork) ||
          selector(isFree) ||
          selector(isNetworkManger) ||
          selector(isMasterAgent),
      },
    };
  }, [selector]);

  // 포지션 관련 API
  const positionQueryMap = useMemo<{
    [name in positionkeyName]: apiOptions;
  }>(() => {
    return {
      positionList: {
        key: "position-list",
        enabled: selector(isNetwork),
      },
      positionNetworkSelect: {
        key: "position-network-select-list",
        enabled: selector({
          requiredRoles: ["ROLE_ADMIN", "ROLE_MASTER"],
          requiredLicenses: ["FULL", "HYBRID", "MASTER", "PERCENT"],
        }),
      },
    };
  }, [selector]);

  return {
    queriesMap,
    networkQueryMap,
    positionQueryMap,
    // ...
  };
};
```

**사용 예시:**

```typescript
// API Query 함수에서
export const networkUserListQuery = ({ enabled, onSuccess }) => {
  const { networkQueryMap } = useQueriesMap();

  return useQuery(
    [networkQueryMap.networkTableList.key],
    async () => {
      const data = await API.get("/network/users");
      return data.data;
    },
    {
      enabled: networkQueryMap.networkTableList.enabled && enabled,
      onSuccess,
    }
  );
};
```

**장점:**

- API 키를 중앙에서 관리
- 권한이 없는 사용자는 자동으로 API 호출이 비활성화됨 (`enabled: false`)
- React Query의 자동 리패칭 방지

---

## 4️⃣ 기능 권한 레이어: UI 인터랙션 제어

### useNetworkPermission: 세밀한 기능 권한 관리

```typescript
// services/admin/src/store/permissions/useNetworkPermission.tsx
const useNetworkPermission = () => {
  const { createAlert, onClickFreeAccess } = useAlert();
  const { push, asPath } = useRouter();
  const selector = useRecoilValue(checkAccessSelector);
  const modalHandle = useSetRecoilState(modalState);

  // 1. 제안하기 권한
  const offerPermission = {
    enable: selector({
      requiredLicenses: [
        "PERCENT",
        "HYBRID",
        "MASTER",
        "FULL",
        "FREE",
        "AGENT",
      ],
      requiredRoles: ["ROLE_ADMIN", "ROLE_AGENT", "ROLE_MASTER"],
    }),
    onClickHandle: (attackid: string) => {
      // 정식 버전 사용자: 모달 오픈
      if (
        selector({
          requiredLicenses: ["PERCENT", "HYBRID", "MASTER", "FULL"],
          requiredRoles: ["ROLE_ADMIN", "ROLE_AGENT", "ROLE_MASTER"],
        })
      ) {
        modalHandle({
          modalType: "network-offer",
          isOpen: true,
          option: { attackid },
        });
        return;
      }

      // FREE 버전 사용자: 안내 알림
      if (selector({ requiredLicenses: ["FREE"] })) {
        createAlert({
          title: "제안하기",
          subtit: "정식 버전 도입 후 후보자에게 제안을 보낼 수 있어요.",
        });
        return;
      }

      // 권한 없는 사용자: 무료 체험 신청 유도
      onClickFreeAccess(() =>
        modalHandle({
          isOpen: true,
          modalType: "free-access-apply",
          option: { type: "F" },
        })
      );
    },
  };

  // 2. 포지션 저장하기 권한
  const positionPermission = {
    enable: selector({
      requiredRoles: ["ROLE_ADMIN", "ROLE_MASTER"],
    }),
    onClickHandle: ({ attackId, positionId, callback }) => {
      // FREE 버전 체크
      if (selector({ requiredLicenses: ["FREE"] })) {
        createAlert({
          title: "채용 포지션에 저장",
          subtit:
            "정식 버전 도입 후 포지션 별로 후보자를 저장하고 관리해 보세요.",
        });
        return;
      }

      // AGENT 역할 체크
      if (selector({ requiredRoles: ["ROLE_AGENT"] })) {
        createAlert({ title: "현재 지원되는 기능이 아닙니다." });
        return;
      }

      // 권한 있는 사용자: 모달 오픈
      if (
        selector({
          requiredLicenses: ["PERCENT", "HYBRID", "MASTER", "FULL"],
          requiredRoles: ["ROLE_ADMIN", "ROLE_MASTER"],
        })
      ) {
        modalHandle({
          isOpen: true,
          modalType: "position",
          option: {
            id: attackId[0],
            folderPositionId: positionId,
            ids: attackId,
            callback,
          },
        });
        return;
      }

      // 그 외: 무료 체험 신청 유도
      onClickFreeAccess(() =>
        modalHandle({
          isOpen: true,
          modalType: "free-access-apply",
          option: { type: "F" },
        })
      );
    },
  };

  // 3. 찜 기능
  const { mutate: scrapUser } = networkUserScrapMutation({});
  const onClickScrap = ({ id, scrap, onSuccess }) => {
    if (
      selector({
        requiredLicenses: ["PERCENT", "HYBRID", "MASTER", "FULL", "FREE"],
        requiredRoles: ["ROLE_ADMIN", "ROLE_AGENT", "ROLE_MASTER"],
      })
    ) {
      scrapUser({ id, scrap }, { onSuccess });
      return;
    }
    onClickFreeAccess(() =>
      modalHandle({
        isOpen: true,
        modalType: "free-access-apply",
        option: { type: "F" },
      })
    );
  };

  // 4. 구독 필요 권한 (추가 수익화 로직)
  const needSubscriptionPermission = {
    enable: needSubscriptionEnable(),
    onClickNavi: () => {
      if (subScription) {
        push("/salary/setting/subscription");
      } else {
        push("/salary/setting/subscription/new?from=" + asPath);
      }
    },
  };

  return {
    offerPermission,
    positionPermission,
    onClickScrap,
    needSubscriptionPermission,
    // ...
  };
};
```

**사용 예시:**

```tsx
// UI 컴포넌트에서
const UserCard = ({ user }) => {
  const { offerPermission, positionPermission, onClickScrap } =
    useNetworkPermission();

  return (
    <Card>
      <h3>{user.name}</h3>

      {/* 제안하기 버튼 */}
      {offerPermission.enable && (
        <Button onClick={() => offerPermission.onClickHandle(user.id)}>
          제안하기
        </Button>
      )}

      {/* 포지션 저장 버튼 */}
      {positionPermission.enable && (
        <Button
          onClick={() =>
            positionPermission.onClickHandle({
              attackId: [user.id],
            })
          }>
          포지션에 저장
        </Button>
      )}

      {/* 찜 버튼 */}
      <IconButton
        onClick={() =>
          onClickScrap({
            id: user.id,
            scrap: !user.isScraped,
            onSuccess: () => refetch(),
          })
        }>
        ❤️
      </IconButton>
    </Card>
  );
};
```

**핵심 특징:**

- **권한별 차별화된 UX**: 같은 버튼을 클릭해도 권한에 따라 다른 동작 (모달 오픈 vs 알림 vs 업그레이드 유도)
- **Upselling 전략**: 무료 사용자에게 유료 기능 존재를 알리고 전환 유도
- **enable 플래그**: 버튼 자체를 숨길지 보여줄지 제어

---

## 실전 활용 패턴

### 패턴 1: 다단계 권한 체크

```typescript
// 여러 조건을 순차적으로 체크하는 패턴
const onClickHandle = () => {
  // 1차: 정식 버전 체크
  if (selector({ requiredLicenses: ["FULL", "HYBRID", "MASTER", "PERCENT"] })) {
    // 기능 실행
    executeFeature();
    return;
  }

  // 2차: FREE 버전 체크
  if (selector({ requiredLicenses: ["FREE"] })) {
    // 안내 메시지
    createAlert({ title: "정식 버전에서 사용 가능합니다." });
    return;
  }

  // 3차: 그 외 (TRIAL, 권한 없음)
  onClickFreeAccess(() => {
    // 무료 체험 신청 유도
    openFreeAccessModal();
  });
};
```

### 패턴 2: 조건부 렌더링

```tsx
// UI 레벨에서 권한에 따라 다른 컴포넌트 표시
const selector = useRecoilValue(checkAccessSelector);

return (
  <>
    {selector(isNetwork) && <NetworkDashboard />}
    {selector(isAgent) && <AgentDashboard />}
    {selector(isFree) && <FreePlanBanner />}
  </>
);
```

### 패턴 3: API 권한과 UI 권한 동기화

```typescript
// API와 UI 권한을 동일하게 관리
const { networkQueryMap } = useQueriesMap();
const canViewNetworkList = networkQueryMap.networkTableList.enabled;

return <>{canViewNetworkList && <NetworkListButton onClick={handleClick} />}</>;
```

---

## 설계 시 주의사항

### 1. 권한 조건의 일관성 유지

❌ **나쁜 예:**

```typescript
// 컴포넌트 A
const enable = selector({ requiredLicenses: ["FULL", "HYBRID"] });

// 컴포넌트 B (같은 기능인데 다른 조건)
const enable = selector({ requiredLicenses: ["FULL", "HYBRID", "MASTER"] });
```

✅ **좋은 예:**

```typescript
// RolelicesnsSelector.ts에 공통 조건 정의
export const isPaidUser = {
  requiredLicenses: ["FULL", "HYBRID", "MASTER", "PERCENT"],
} as condition;

// 여러 곳에서 동일하게 사용
const enable = selector(isPaidUser);
```

### 2. AND/OR 로직 명확히 하기

```typescript
// 명시적으로 조건 로직 지정
const enable = selector({
  requiredRoles: ["ROLE_ADMIN", "ROLE_MASTER"],
  requiredLicenses: ["FULL", "HYBRID"],
  condition: "AND", // Role AND License 모두 만족해야 함
});
```

### 3. 권한 없을 때 적절한 피드백 제공

```typescript
// 단순히 버튼 숨기기보다는 존재를 알리고 업그레이드 유도
{
  offerPermission.enable ? (
    <Button onClick={offerPermission.onClickHandle}>제안하기</Button>
  ) : (
    <Tooltip content="정식 버전에서 사용 가능합니다">
      <Button disabled onClick={() => openUpgradeModal()}>
        제안하기 🔒
      </Button>
    </Tooltip>
  );
}
```

### 4. 구독 상태와 라이선스 분리

```typescript
// 라이선스는 있지만 구독이 필요한 경우 (추가 수익화)
const needSubscriptionEnable = () => {
  if (isNew) return false;
  if (subScription?.status === "error") return false;

  return (
    selector({ requiredLicenses: ["PERCENT"] }) &&
    !selector({ requiredLicenses: ["SUBSCRIPTION"] })
  );
};
```

---

## 마치며

이 권한 관리 시스템의 핵심은 **4단계 레이어 분리**와 **단일 진실 공급원**입니다:

1. **상태 레이어**: `userState` + `checkAccessSelector`가 모든 권한 판단의 기준
2. **페이지 레이어**: `CheckSalaryUser` HOC로 라우트 가드
3. **API 레이어**: `useQueriesMap`으로 API 호출 제어
4. **기능 레이어**: `useNetworkPermission`으로 세밀한 UX 제어

이러한 구조를 통해:

- ✅ 권한 로직이 한 곳에 집중되어 유지보수가 쉬움
- ✅ 새로운 권한 추가 시 확장이 용이함
- ✅ 권한별로 다른 UX를 제공하여 비즈니스 가치 극대화
- ✅ TypeScript를 통한 타입 안정성 확보

복잡한 B2B SaaS의 권한 관리를 고민하고 계신다면, 이 패턴을 참고하여 구현해 보시기를 추천합니다! 🚀

---

## 참고 자료

### 주요 파일 위치

```
services/admin/src/
├── store/
│   ├── salary/
│   │   ├── userState.ts                     # 사용자 상태 관리
│   │   └── RolelicesnsSelector.ts           # 권한 체크 로직
│   └── permissions/
│       └── useNetworkPermission.tsx         # 기능 권한 Hook
├── component/HOC/
│   └── CheckSalaryUser/
│       ├── index.tsx                        # 페이지 가드 HOC
│       ├── accessControlMap.tsx             # 페이지별 권한 정의
│       └── routeMapping.ts                  # 권한별 리다이렉트
└── api/
    └── useQueriesMap.tsx                    # API 권한 관리
```

### 라이선스 타입

- `FREE`: 무료 체험
- `TRIAL`: 둘러보기
- `PERCENT`: 정률제
- `FULL`: 풀 패키지
- `HYBRID`: 하이브리드
- `MASTER`: 마스터
- `AGENT`: 에이전트

### 역할(Role) 타입

- `ROLE_ADMIN`: 관리자
- `ROLE_MASTER`: 마스터
- `ROLE_AGENT`: 에이전트
- `ROLE_MANAGER`: 매니저
