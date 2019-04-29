import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import Sockette from 'sockette';
import styled from 'styled-components';
import _reduce from 'lodash.reduce';
import config from './config';

import sigilStark from './images/stark.png';
import sigilBaratheon from './images/baratheon.png';
import sigilTargaryen from './images/targaryen.png';
import sigilGreyjoy from './images/greyjoy.png';
import sigilLannister from './images/lannister.png';
import sigilTully from './images/tully.png';

let ws = null;

const Voter = () => {
  const [ballotsList, setBallotsList] = useState({
    Stark: 0,
    Baratheon: 0,
    Targaryen: 0,
    Greyjoy: 0,
    Lannister: 0,
    Tully: 0
  });

  const onVote = vote => {
    ws.json({
      action: 'sendMessage',
      data: JSON.stringify(vote)
    });
  };

  const onMessageReceied = ({ data }) => {
    const voteData = JSON.parse(data);
    setBallotsList({ ...ballotsList, ...voteData });
  };

  const onConnection = e => {
    console.log('connected:', e);
  };

  useEffect(() => {
    ws = new Sockette(config.site.api, {
      timeout: 5e3,
      maxAttempts: 1,
      onopen: e => onConnection(e),
      onmessage: e => onMessageReceied(e),
      onreconnect: e => console.log('Reconnecting...', e),
      onmaximum: e => console.log('Stop Attempting!', e),
      onclose: e => console.log('Closed!', e),
      onerror: e => console.log('Error:', e)
    });
    return function cleanup() {
      ws && ws.close();
      ws = null;
    };
  }, []);

  const ballotArray = [
    ' ',
    ballotsList.Stark,
    ballotsList.Baratheon,
    ballotsList.Targaryen,
    ballotsList.Greyjoy,
    ballotsList.Lannister,
    ballotsList.Tully
  ];

  return (
    <VoterArea>
      <ChartBar>
        <Chart
          width="600px"
          height="400px"
          chartType="Bar"
          loader={<div>Loading Chart</div>}
          data={[
            [
              '',
              'Stark',
              'Baratheon',
              'Targaryen',
              'Greyjoy',
              'Lannister',
              'Tully'
            ],
            ballotArray
          ]}
          options={{
            hAxis: { minValue: 0, maxValue: 15 },
            vAxis: { minValue: 0, maxValue: 15 },
            legend: { position: 'none' },
            animation: {
              duration: 1000,
              easing: 'out',
              startup: true
            },
            colors: [
              '#414141',
              '#693813',
              '#9C1408',
              '#302955',
              '#ecad00',
              '#1b94b7'
            ],
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
      </ChartBar>
      <VoterButtonBar>
        <VoterButton color="#414141">
          <VoterThumb
            src={sigilStark}
            alt="Stark"
            onClick={() => onVote('Stark')}
          />
        </VoterButton>
        <VoterButton color="#693813">
          <VoterThumb
            src={sigilBaratheon}
            alt="Baratheon"
            onClick={() => onVote('Baratheon')}
          />
        </VoterButton>
        <VoterButton color="#9C1408">
          <VoterThumb
            src={sigilTargaryen}
            alt="Targaryen"
            onClick={() => onVote('Targaryen')}
          />
        </VoterButton>
        <VoterButton color="#302955">
          <VoterThumb
            src={sigilGreyjoy}
            alt="Greyjoy"
            onClick={() => onVote('Greyjoy')}
          />
        </VoterButton>
        <VoterButton color="#ecad00">
          <VoterThumb
            src={sigilLannister}
            alt="Lannister"
            onClick={() => onVote('Lannister')}
          />
        </VoterButton>
        <VoterButton color="#1b94b7">
          <VoterThumb
            src={sigilTully}
            alt="Tully"
            onClick={() => onVote('Tully')}
          />
        </VoterButton>
      </VoterButtonBar>
    </VoterArea>
  );
};

const VoterArea = styled.div`
  display: grid;
  grid-template-rows: 3fr 1fr;
  height: 100%;
`;

const ChartBar = styled.div`
  align-self: center;
  justify-self: center;
  transform: scale(0.5);
  overflow: hidden;

  @media only screen and (min-width: 768px) {
    transform: inherit;
  }
`;

const VoterButtonBar = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-self: end;

  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

const VoterButton = styled.div`
  background-color: ${props => (props.color ? props.color : 'green')};
`;

const VoterThumb = styled.img`
  width: 100%;
`;

export default Voter;
