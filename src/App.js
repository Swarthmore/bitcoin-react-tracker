import {useState, useEffect} from 'react';
import Chart from './Chart';

import './App.css';

function App() {

  const [bpi, setBpi] = useState(null);
  const [error, setError] = useState(null);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Get the data from the Coinbase API
  const fetchData = async (start=null, end=null) => {
    const url = new URL('https://api.coindesk.com/v1/bpi/historical/close.json');
    start && url.searchParams.set('start', start);
    end && url.searchParams.set('end', end);
    const response = await fetch(url.toString());
    const data = await response.json();
    return data;
  }

  // When the component mounts, fetch the data
  useEffect(() => {
    fetchData(startDate, endDate)
      .then(data => {
        const bpi = Object.keys(data.bpi).map(key => ({ x: key, y: data.bpi[key] }));
        setBpi(bpi);
      })
      .catch(error => setError(error))
  }, [startDate, endDate]);

  return (
    <div className="App">
      <main>
        <h6>BTC Price History</h6>
        {bpi && <Chart data={bpi} />}

        <div className="date-inputs">
          <label>
            Start: <input value={startDate} onChange={e => setStartDate(e.target.value)} type="date" min="2021-10-15" />
          </label>

          <label>
            End: <input value={endDate} onChange={e => setEndDate(e.target.value)} type="date" max="2021-11-15" />
          </label>
        </div>


      </main>

      <footer>
        <a href={"https://old.coindesk.com/price/bitcoin"}>Powered by CoinDesk</a>
      </footer>
    </div>
  );
}

export default App;
