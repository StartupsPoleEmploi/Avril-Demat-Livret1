export default async function ({ store, req, env } = context) {
  if (process.client && store.state.hash) {
    const response = await fetch(`${env.apiUrl}/api/booklet?hash=${store.state.hash}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        identity: store.state.identity,
        experiences: store.state.experiences,
      })
    });
    if (response.ok) {
      const data = await response.json();
      console.log(':) Saved', data);
    } else {
      console.log(':( Could not save')
    }
  } else {
    console.log(process.client ? 'Not authenticated, no save' : 'Server side, no need to reload')
  }
}
