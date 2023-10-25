# A-ToDo-Client

지금 하는 일에 집중할 수 있는 todo App ([Server](https://github.com/goldentrash/A-ToDo-Server))

## version comments

see [wiki](https://github.com/goldentrash/A-ToDo-Client/wiki)

## apk

download [LTS](https://expo.dev/accounts/whitepiano/projects/a-todo/builds/ae53b57d-a6ea-4247-aae5-18d07d8afa53)

## 목표

A-ToDo는 지금 하는 일에 집중할 수 있도록 도와주는 프로그램입니다. 무언가 일을 시작했다면, 마무리할 때까지 집중해서 끝내는 것이 가장 좋습니다. 하지만 현실을 녹록지 않아서 그러기 쉽지 않지요. 무언가 일을 하다가도 늘 새로운 일이 생겨나니까요. "나중에 해야겠다"는 말은 마법과 같아서 그대로 잊히기 십상입니다. 그 순간의 영감과 계획은 휘발되고 어렴풋이 무언가 해야 했다는 기억의 편린만이 남게 되죠. 그렇다고 새로운 일이 생겼을 때 지금 하던 일을 멈춘다면, 순환은 반복되고 어떤 일도 마무리하지 못하게 됩니다. 가장 좋은 해결 방법은 떠오른 일을 기록해 두고 우선 잊은 다음 나중에 다시 돌아보는게 아닐까요? 바로 이 생각에서 A-ToDo가 시작되었습니다.

하나의 과제를 시작하면 멈출 수 없기 때문에, A-ToDo에서 정의하는 'todo'란 아무리 오래 걸려도 하루 안에는 완료할 수 있는 일입니다. 그래서 내용은 100자가 넘을 수 없으며, deadline도 등록일로부터 30일을 초과할 수 없습니다. 애초에 아주 오래 걸리는 규모 있는 일이라면 todo list를 사용할 것이 아니겠지요.

> 단순하게 "~기능 만들기"가 아닌, "~기능을 위해 foo 함수가 callback을 사용하도록 refactoring"처럼 작은 영감, 혹은 시도가 'todo'입니다.

A-ToDo를 관통하는 가장 큰 키워드는 '집중'입니다. 그래서 간결한 UI를 사용합니다. 너무 휑한게 아닌가 싶을 정도로 최소한의 Interface를 배치했습니다. 지금 하는 일에 집중하기 위해, 무언가 시작했다면 Todo List를 조회할 수 없습니다. 오직 새로운 과제를 추가하는 것만이 가능하죠. 일을 다 마친 다음에야 어떤 할 일이 있는지 확인하고 다음 일을 시작하게 됩니다. 그런 만큼 '시작'은 신중해야 하지만, '추가'는 손쉬워야 하죠. 때문에 유일하게 새로운 일을 추가하는 과정만이 두 번의 확인을 거치지 않습니다. 'add todo' 버튼 클릭 한 번으로 새로운 일이 추가되죠. 일을 시작할 때와 마칠 때 최소 2번의 클릭이 필요한 것과 대조적입니다.

다른 일을 하던 중이었다면 등록된 todo를 확인할 수 없기 때문에 내용이 중복될 수도 있습니다. 이 또한 의도된 것으로, "이 일을 내가 등록했던가?" 고민하고 확인하는 짧은 순간의 낭비조차도 줄이고자 했습니다. 만약 뭔가 해야 한다 생각했다면 망설이지 말고 그냥 등록합시다. 중복된 todo라면 하던 일을 다 마무리한 후에 삭제하면 그만이지요.
