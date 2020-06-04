import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import * as Sentry from '@sentry/browser';
import '../assets/1.scss'
import Head from 'next/head'
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

//Binding events. 
Sentry.init({dsn: "https://fc3b66bc262e49c0a4c28fae814dbf31@o397020.ingest.sentry.io/5251177"});

NProgress.configure({ showSpinner: true });

Router.onRouteChangeStart = () => {
  // console.log('onRouteChnageStart triggered');
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  // console.log('onRouteChnageComplete triggered');
  NProgress.done();
};

Router.onRouteChangeError = () => {
  // console.log('onRouteChnageError triggered');
  NProgress.done();
};

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 6000)
  }, [])

    return (
    <React.Fragment>
        <Head>
          <script id="ze-snippet" src="https://static.zdassets.com/ekr/snippet.js?key=cc38523f-eb8e-4023-bc68-d670179ba3ee"> </script>
          <link href="https://fonts.googleapis.com/css2?family=Montserrat&family=Raleway:wght@500&display=swap" rel="stylesheet"></link>
        </Head>
        <Component {...pageProps} />
    </React.Fragment>
    )
}
export default MyApp;