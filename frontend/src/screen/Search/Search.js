import React from 'react';
import { withRouter, useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import CssTextField from '../../component/CssTextField/CssTextField';
import Highlight from 'react-highlighter';

function Search(props) {
  let { queryStr } = useParams();
  const [search, setSearch] = React.useState('');
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    fetch('https://api.doctorsearch.me/api/search?q=' + queryStr)
      .then(results => results.json())
      .then(d => setData(d));
  }, [queryStr]);

  const handleChange = e => {
    setSearch(e.target.value);
  };
  const handleKey = e => {
    if (e.keyCode === 13 && search.length > 0) {
      props.history.push({
        pathname: '/search/' + search,
        state: { type: props.location.state ? props.location.state.type : null }
      });
    }
  };
  let cnt = 0;
  const doctors =
    data !== null &&
    (!props.location.state || !props.location.state.type || props.location.state.type === 'doctors')
      ? data.doctors.slice(0, 20).map(item => {
          cnt += 1;
          return (
            <div key={cnt} style={{ paddingBottom: '1em' }}>
              <h3
                onClick={() => {
                  props.history.push('/doctors/' + item.id);
                }}
                style={{ color: 'blue', cursor: 'pointer' }}
              >
                {' '}
                <Highlight search={queryStr}>{item.name}</Highlight>{' '}
              </h3>
              <p>
                <Highlight search={queryStr}>
                  {item.bio.length > 100 ? item.bio.slice(0, 200) + '...' : item.bio}
                </Highlight>
              </p>
            </div>
          );
        })
      : [];
  const cities =
    data !== null &&
    (!props.location.state || !props.location.state.type || props.location.state.type === 'cities')
      ? data.cities.slice(0, 20).map(item => {
          cnt += 1;
          return (
            <div key={cnt} style={{ paddingBottom: '1em', lineHeight: '.2em' }}>
              <h3
                onClick={() => {
                  props.history.push('/cities/' + item.id);
                }}
                style={{ color: 'blue', cursor: 'pointer' }}
              >
                {' '}
                <Highlight search={queryStr}>{item.name}</Highlight>,{' '}
                <Highlight search={queryStr}>{item.region}</Highlight>{' '}
              </h3>
              <p>
                <Highlight search={queryStr}>{item.country}</Highlight>, population:{' '}
                <Highlight search={queryStr}>{item.population}</Highlight>
              </p>
            </div>
          );
        })
      : [];
  const specialties =
    data !== null &&
    (!props.location.state ||
      !props.location.state.type ||
      props.location.state.type === 'specialties')
      ? data.specialties.slice(0, 20).map(item => {
          cnt += 1;
          return (
            <div key={cnt} style={{ paddingBottom: '1em', lineHeight: '1em' }}>
              <h3
                onClick={() => {
                  props.history.push('/specialties/' + item.id);
                }}
                style={{ color: 'blue', cursor: 'pointer' }}
              >
                {' '}
                <Highlight search={queryStr}>{item.name}</Highlight>{' '}
              </h3>
              <p>
                <Highlight search={queryStr}>
                  {item.description.length > 100
                    ? item.description.slice(0, 200) + '...'
                    : item.description}
                </Highlight>
              </p>
            </div>
          );
        })
      : [];
  return (
    <div style={{ margin: '3em' }}>
      <h1>You searched for: {queryStr}</h1>
      {props.location.state && props.location.state.type !== null ? (
        <p>Searching only in {props.location.state.type}</p>
      ) : null}
      <CssTextField
        id="outlined-basic"
        label="Search again"
        margin="normal"
        variant="outlined"
        onChange={handleChange}
        onKeyDown={handleKey}
      />
      <h2>Results:</h2>
      <Paper>
        {' '}
        <div style={{ padding: '1em', lineHeight: '1em' }}>
          {doctors.length > 0 ? <h2> Doctors: </h2> : null}
          {doctors}
          {cities.length > 0 ? <h2> Cities: </h2> : null}
          {cities}
          {specialties.length > 0 ? <h2> Specialties: </h2> : null}
          {specialties}
        </div>
      </Paper>
    </div>
  );
}

export default withRouter(Search);
