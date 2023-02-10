import CustomKeyboard from './components/CustomKeyboard';

function App() {
  const onClick = (keyboardKey: string) => {
    console.log(keyboardKey);
  };

  return <CustomKeyboard onKeyClick={onClick} />;
}

export default App;
