import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import * as Sentry from '@sentry/browser';
import '../assets/1.scss'
import Head from 'next/head'
import Collapse from '@material-ui/core/Collapse';

//Binding events. 
Sentry.init({dsn: "https://fc3b66bc262e49c0a4c28fae814dbf31@o397020.ingest.sentry.io/5251177"});
Router.events.on('routeChangeStart', () => NProgress.start()); Router.events.on('routeChangeComplete', () => NProgress.done()); Router.events.on('routeChangeError', () => NProgress.done());
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
        </Head>
        <Collapse in={loading}>
        <div className="wrapper" style={{"opacity":"1","backgroundColor":"#ccc","position":"fixed","width":"100%","height":"100%","top":"0px","left":"0px","zIndex":"9999", "display": "block"}}>
        <img style={{"height":"187px","margin":"16% 41%"}} src="https://uilogos.co/img/logotype/treva.png" alt=""/>
        </div>
        </Collapse>
        <Component {...pageProps} />
    </React.Fragment>
    )
}
export default MyApp;