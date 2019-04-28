import React, { useEffect, useState } from "react";
import { Chart } from 'react-google-charts';
import Sockette from "sockette";
let ws = null;

const Voter = props => {
  const [ballotsList, setBallotsList] = useState([]);
  const { username } = 'DVB';

  useEffect(
    () => {
        ws = new Sockette(
          "wss://1rh5eh6qpj.execute-api.us-east-1.amazonaws.com/feat-socket/",
          {
            timeout: 5e3,
            maxAttempts: 1,
            onopen: e => console.log("connected:", e),
            onmessage: e => onMessageReceied(e),
            onreconnect: e => console.log("Reconnecting...", e),
            onmaximum: e => console.log("Stop Attempting!", e),
            onclose: e => console.log("Closed!", e),
            onerror: e => console.log("Error:", e)
          }
        );
      return function cleanup() {
        ws && ws.close();
        ws = null;
      };
    },
    [ballotsList]
  );

  const onMessageWasSent = message => {
    const newMessage = { ...message, author: username };
    ws.json({
      action: "sendMessage",
      data: JSON.stringify(newMessage)
    });
  };

  const onMessageReceied = ({ data }) => {
    const { type, data: messageData } = JSON.parse(data);
    setBallotsList([
      ...ballotsList,
      {
        type,
        data: messageData
      }
    ]);
  };
  return (
    <div>
      <Chart
        width={'600px'}
        height={'400px'}
        chartType="Bar"
        loader={<div>Loading Chart</div>}
        data={[
          ['', 'Stark', 'Tyrell', 'Targaryen', 'Greyjoy', 'Lannister'],
          [' ',16,46,52,26,76],
        ]}
        options={{
          hAxis: { minValue: 0, maxValue: 15 },
          vAxis: { minValue: 0, maxValue: 15 },
          legend: { position: 'none'},
          colors: ['#414141', '#ED7000', '#9C1408', '#302955', '#ecad00'],
          bars: 'horizontal',
            axes: {
              y: {
                0: { side: 'right' }
              }
            }
        }}
        rootProps={{ 'data-testid': '1' }}
        chartPackages={['corechart', 'controls', 'charteditor']}
      />
      <div>
        
      </div>
    </div>
  );
};

export default Voter;
