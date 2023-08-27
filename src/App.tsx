import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { storeInput } from './actions';

const App: React.FC = () => {
  const [input, setInput] = useState<string>(''); // Provide explicit type
  const inputs = useSelector((state: RootState) => state.app.inputs);
  const dispatch = useDispatch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = event.target.value;
    setInput(newInput);

    if (newInput.trim() !== '') {
      const matchingInput = inputs.find((input) => input === newInput);
      if (matchingInput) {
        setInput(matchingInput);
      }
    }
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(storeInput(input));
    setInput('');
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input type="text" value={input} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
      <div>
        <h2>Stored Inputs:</h2>
        <ul>
          {inputs.map((input, index) => (
            <li key={index}>{input}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
