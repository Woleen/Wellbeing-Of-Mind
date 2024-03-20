import React from 'react';

function Homepage() {
  return (
    <div className="container mt-5 text-white bg-dark p-4">
      <h1 className="display-4">Welcome to Wellbeing of Mind</h1>
      <p className="lead mt-4">Your go-to destination for mental health and wellness.</p>

      <div className="row mt-4">
        <div className="col-md-6">
          <h2>About Mental Health</h2>
          <p>
            Mental health is an essential part of overall well-being. It includes
            emotional, psychological, and social well-being. Mental health affects
            how we think, feel, and act. It also helps determine how we handle
            stress, relate to others, and make choices.
          </p>
          <p>
            Taking care of your mental health is important at every stage of life,
            from childhood and adolescence through adulthood.
          </p>
        </div>
        <div className="col-md-6">
          <h2>Resources</h2>
          <ul className="list-group">
            <li className="list-group-item">
              Centrum Wsparcia dla Osób Dorosłych w Kryzysie Psychicznym at <a href="tel:800702222">800 702 222</a> (dorośli).
            </li>
            <li className="list-group-item">
              Telefon zaufania dla dzieci i młodzieży at{' '}
              <a href="tel:116111">116 111</a> (dzieci i młodzież).
            </li>
            <li className="list-group-item">
              Telefon wsparcia emocjonalnego dla dorosłych at{' '}
              <a href="tel:116123">116 123</a> (dorośli).
            </li>
            <li className="list-group-item">
              Dziecięcy Telefon Zaufania Rzecznika Praw Dziecka at{' '}
              <a href="tel:800121212">800 121 212</a>.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
