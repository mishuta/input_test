import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { storeInput, clearInputs } from './actions';
import styles from './App.module.scss';

const App: React.FC = () => {
  const [input, setInput] = useState<string>(''); // Provide explicit type
  const inputs = useSelector((state: RootState) => state.app.inputs);
  const dispatch = useDispatch();

  const matchingInputs = input.trim() !== "" ? [...new Set(inputs.filter((storedInput) =>
    storedInput.includes(input)
  ))] : [];

  useEffect(() => {
    const storedInputs = localStorage.getItem("storedInputs");
    if (storedInputs) {
      dispatch(storeInput(JSON.parse(storedInputs)));
    }
  }, [dispatch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = event.target.value;
    setInput(newInput);

    // if (newInput.trim() !== '') {
    //   const matchingInput = inputs.find((input) => input === newInput);
    //   if (matchingInput) {
    //     setInput(matchingInput);
    //   }
    // }
  };

  const handleFormSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    console.log(input)
    if (input.trim() !== "") {
      dispatch(storeInput(input));
      setInput('');
    }
  }, [dispatch, input])

  const handleMatchingInputClick = (clickedInput: string) => {
    setInput(clickedInput);
  };

  const handleClearStoredInputs = () => {
    localStorage.removeItem("storedInputs");
    dispatch(clearInputs());
  };


  return (
    <div className={styles.appContainer}>
      <form onSubmit={handleFormSubmit} className={styles.form_container}>
        <input type="text" value={input} onChange={handleInputChange} />
        <button type="submit">Submit</button>
        <button onClick={handleClearStoredInputs}>Clear Stored Inputs</button>
      </form>
      <div className={styles.matching_inputs}>
        <h2>Matching Inputs:</h2>
        <ul>
          {matchingInputs.map((matchingInput, index) => (
            <li key={index} onClick={() => handleMatchingInputClick(matchingInput)}>
              {matchingInput}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.inputs_container}>
        <div className={styles.stored_inputs}>
          <h2>Stored Inputs:</h2>
          <ul>
            {inputs.map((input, index) => (
              <li key={index}>{input}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
