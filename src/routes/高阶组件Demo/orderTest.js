/**
 *  @description 高阶组件测试
 */
import React from 'react';
import { render } from 'react-dom';


const withGists = (PassedComponent) => (
    //将 HTTP 请求的结果传递给函数组件  withGists 会传递 gist api 调用的结果
    class WithGists extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                gists: []
            }
        }
        componentDidMount() {
            fetch("https://api.github.com/gists/public")
            .then(r => r.json())
            .then(gists => this.setState({
                gists
            }))
        }

        render() {
            return <PassedComponent {...this.props} gists={this.state.gists} />
        }
    }
)


const Gist = ({ id, html_url, files }) => (
    <div>
      <a href={html_url}>{id}</a>
      <ul>
        {Object.entries(files).map(([filename, data]) =>
          <li><a href={data.raw_url} key={filename}>{filename}</a></li>
        )}
      </ul>
    </div>
)


const Gists = ({ gists }) => (
    <div>
      <h1>Gists</h1>
      {gists.map(gist =>
        <div key={gist.id}>
          <Gist {...gist} />
          <hr />
        </div>
      )}
    </div>
)


const GistsList = withGists(Gists)

export default GistsList;
