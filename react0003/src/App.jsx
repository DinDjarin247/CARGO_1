import Clock from "./Clock";
import Area from "./Area";
import Weather from "./Weather";
import { API_KEY } from "./secret";
import { useCallback, useRef, useState, useEffect } from "react";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";
import TodoTemplate from "./components/TodoTemplate";
import styled from "styled-components";

function App() {
  const [area, setArea] = useState({});
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(null);

  const [todos, setTodos] = useState([
    { id: 1, text: "리액트의 기초 알아보기", checked: true },
    { id: 2, text: "컴포넌트 스타일링해 보기", checked: true },
    { id: 3, text: "일정 관리 앱 만들어 보기", checked: false },
  ]);

  const nextId = useRef(todos.length + 1);

  const onInsert = (text) => {
    const todo = { id: nextId.current, text: text, checked: false };
    const new_todos = [...todos, todo];
    setTodos(new_todos);
    nextId.current++;
  };

  const onRemove = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos]
  );

  const onToggle = useCallback(
    (id) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo
        )
      );
    },
    [todos]
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        get(lat, lon);
      },
      (error) => {
        setError("위치 정보를 가져오는데 실패했습니다.");
      }
    );

    async function get(lat2, lon2) {
      try {
        const data = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat2}&lon=${lon2}&units=metric&appid=${API_KEY}`
        );
        const res = await data.json();
        console.log(res);
        if (!res.coord || !res.name || !res.weather || !res.main || !res.wind) {
          throw new Error("API 응답 데이터가 올바르지 않습니다.");
        }
        const lat = res.coord.lat;
        const lon = res.coord.lon;
        const name = res.name;
        setArea({ lat, lon, name });

        const icon = `http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`;
        const desc = res.weather[0].description;
        const temp = res.main.temp;
        const speed = res.wind.speed;
        const main = res.weather[0].main;
        setWeather({ icon, desc, temp, speed, main });
      } catch (error) {
        setError("날씨 정보를 가져오는데 실패했습니다.");
      }
    }
  }, []);
  const Button = styled.button`
    background-color: ${(props) => (props.primary ? "blue" : "grey")};
    color: white;
    &:hover {
      opacity: 0;
    }
  `;

  return (
    <div>
      <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
        <Clock></Clock>
      </div>

      {error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          <Area data={area} />
          <Weather data={weather} />
        </>
      )}
      <Button>Defult-BUtton</Button>
      <Button primary>primary-Button</Button>
      <TodoTemplate>
        <TodoInsert onInsert={onInsert} />
        <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
      </TodoTemplate>
    </div>
  );
}

export default App;
