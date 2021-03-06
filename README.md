# Instagram front-end repository

## 설명

- 에듀케스트의 React와 Django를 활용하여 Instagram을 클론해본다.

## 여담

- React의 Tutorial을 한 번 수행하고 난 뒤 다시 진행하니 코드가 보인다.
- 처음 따라할 때에는 리액트가 어떤 건지도 모르고, Virtual Dom, State, Component 등의 개념을 처음 만났기 때문에 그저 코드를 옮겨 적기에 지나지 않았다.
- 비록 어렴풋이 감만 잡은 정도이긴 하지만 알 수록 보이는게 많다는 말이 딱 들어맞는다.

## Note

- react 학습 단계 설정
  - react의 Documentation tutorial을 통해 정리한다. (+ JS)
  - 드림코딩의 react 강좌 중 하나를 수행하여 실무에 활용될 여러 Tip을 정리한다.

## 서술

- axios를 활용해 비동기적으로 Django의 데이터를 받아오는 방법을 학습한다.
- react-router-dom을 활용해 url마다 component를 할당하는 방식을 학습한다.
- antd를 활용하여 기본적인 레이아웃을 디자인한다. (Front-end 전문가가 사용할 만한 프레임워크일까?)
- JS의 기본 함수 활용에 숙달이 되어있질 않으니, 보고서 이해할 수는 있지만 응용하기가 버겁다. JS 튜토리얼을 다시 봐야한다.
- 에러코드를 잘 읽어보자. 404는 '통신은 할 수 있는데 니가 요청한 페이지가 없더라'이다. 프론트를 잘못 만진 줄 알았더니 알고보니 token의 url을 잘못 설정했다.
- useReduce와 useContext, useReducerWithSideEffects 등을 활용하여 jwtToken 정보를 전역적으로 관리할 수 있는 작은 모듈을 설계하는데, 아직 react의 useReduce와 useContext 훅에 익숙하지 않아서 써드파티 라이브러리까지 합친 뒤 커스텀하니 이해하기 버겁다. 대략적으로 이해하지만 직접 짜지 못할 것이다. React를 따로 학습해야겠다.
- useAxios를 학습해서 api와 통신하는 방법을 따로 정리해야겠다.
- Post의 좋아요 기능 구현에서, 강좌에서는 PostList에서 상태를 관리하도록 했지만 개인적으로 하나의 Post를 다루는 로직은 Post 내에 있는 것이 맞는 방식인 것 같아 강좌와는 다른 방식으로 구현해보았다. axios를 메소드 호출 방식으로 사용하는 것이 아닌 설정 방식 (예를 들어, axios({...}))으로 활용하는 것이 더 가독성이 좋은 것 같기도 하다. axios에 들어갈 header를 설정할 때 object를 감싼 object를 전달한 탓에 문제를 발견하기가 난감했기 때문... 이건 순전히 JS와 React에 대한 이해도 부족 탓이다.
- 여태까지 배운 내용을 토대로 강좌의 방식이 아닌 직접 Comment 작성 기능을 구현했다. 댓글을 작성할 때 마다 모든 댓글을 새로 불러오는 방식으로 - 즉 비효율적인 방식으로 - 구현되어 있지만, 어느정도 감을 잡았다는 것에 중점을 두려 한다.
- get일때 axios-hooks.useAxios, post일 때 axios.axios를 번갈아가면서 사용하는 것은 구조적으로 별로이다. 가능하다면 둘 중 하나, 개인적으로 useAxios를 배우는 것이 좋다고 생각된다. 그런데, 하나의 axios 객체에 여러 요청이 몰리는 경우에 대한 성능 저하는 없는걸까?
- VSC의 Azure Storage Extension을 활용하여 build한 결과물을 빠르게 서비스하는 과정을 겪고 나니, 마이크로소프트가 VSC에 크게 투자하고 있음을 느꼈다.