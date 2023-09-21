import './App.css';
import { useState, useEffect, forwardRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { click } from '@testing-library/user-event/dist/click';

function App() {

  const [formValues, setFormValues] = useState({email:"", password:"", favClass:"1"});
  const[validationStates, setValidationStates] = useState({
    emailState: true, passwordState: true});
  const [validated, setValidated] = useState(0);

  const APIurl = 'https://jsonplaceholder.typicode.com/posts';
  const emailValidation = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,}|[a-zA-Z]{2,}\.[a-zA-Z]{2,})$/;
  const passValidation = /^(?=.*[A-Za-z])(?=.*[0-9]).{9,}$/;

  const handleEmailChange = ((e) => {
    setFormValues({...formValues, email: e.target.value})
  });

  const handlePasswordChange = ((e) => {
    const validPassword = passValidation.test(e.target.value);
    setFormValues({...formValues, password: e.target.value});
    setValidationStates({ ...validationStates, passwordState: validPassword })
    
  });

  const handleSelectChange = ((e) => {
    setFormValues({...formValues, favClass: e.target.value})
  });

  const clickSubmit = (() => {
    const validEmail = emailValidation.test(formValues.email);
    const validPassword = passValidation.test(formValues.password);
    setValidationStates({ ...validationStates, emailState: validEmail, passwordState: validPassword }); 
    if (validEmail && validPassword){
      setValidated(1);
    } 
  });

  useEffect(() => {
    if (validated === 1){
      setValidated(0);
      alert(JSON.stringify(formValues));
      postData(APIurl, formValues)
      .then((data) => {
        console.log('Data posted:', data);
      })
      .catch((error) => {
        alert("Error!");
      });
    } 
  }, [formValues, validated]); 
  

  async function postData(url, data) {
    const dataToPost = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return dataToPost.json();
  }

 return (
   <div>
     <h1>Ejemplo de formularios!</h1>

     <Form>
      <Form.Group className="mb-6" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} value={formValues.email} className={validationStates.emailState ? null : 'invalid-input'}/>
        { !validationStates.emailState && <Form.Text className="text-muted">Your email should follow an established format.</Form.Text>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} value={formValues.password} className={validationStates.passwordState ? null : 'invalid-input'}/>
        { !validationStates.passwordState && <Form.Text className="text-muted">Your password should be have numbers and letters and should be at least 9 char long</Form.Text>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Label>Favorite Class</Form.Label>
        <Form.Select onChange={handleSelectChange}>
          <option value="1">ISIS3710</option>
          <option value="2">Programación con tecnologias web</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" onClick={clickSubmit}> Submit </Button>
    </Form>

  </div> 
);

}

export default App;