import React, {Component} from 'react';
import dropboxLogo from '../images/dropbox.png'
import * as API from '../api/API';
import { Route, withRouter, Switch} from 'react-router-dom';
import Profile from './Profile';
import Activity from './Activity';
import EditProfile from './EditProfile';
import {connect} from 'react-redux';
import {getIssue} from '../action/openissuelist';
import {resolveIssue} from '../action/Resolveissue'
import like from '../images/like.svg'



class User extends Component {

    constructor(){
        super();
        this.state = {
        };
    }

    componentWillMount(){
        console.log(this.state);
        API.getSession().then((response)=>{
            if(response.status===201){
                console.log("session active");
            }
            else if(response.status===203){
                this.props.handlePageChange("/");
            }
            else{
                console.log("Error");
            }
        });
    }

    // Jay Desai Changes for fetching open issue list
    componentDidMount(){
        var payload;
        var results_for_reducer =[];
        API.currentissuelist(payload).
        then((response)=>{

            console.log(response);
            results_for_reducer = response.issue_raised_array_final;
            console.log(results_for_reducer);

            // Update the reducers
            this.props.getIssue(results_for_reducer);

            });
    }

    componentDidUpdate(){
    }

    componentWillUpdate(){
        // this.fetchDirectoryData(this.state.dirpath);
    }

    shouldComponentUpdate(){
        return true;
    }

// <h2>Section title</h2>
// <div class="table-responsive">
//     <table class="table table-striped">
//     <thead>
//     <tr>
//     <th>#</th>
// <th>Header</th>
// <th>Header</th>
// <th>Header</th>
// <th>Header</th>
// </tr>
// </thead>
// <tbody>


    display()
    {
        return this.props.issues.map((issues,index) =>{
            return(


            <tr>
                <td>{issues.issues._id}</td>
                <td>{issues.issues.topic}</td>
                <td>{issues.issues.issuecontent}</td>
                <td>
                    <button type="button"
                            onClick = {() => {
                                this.props.resolveIssue(issues)
                                this.props.history.push("/responsetoissues")
                            }
                            }

                    ><img src={like} width="30" height="30" alt="Response" align="left"/></button>
                </td>

            </tr>

            )
        });
    }

    render() {

        return (

            <div className="container-fluid">
                <div class="jumbotron">
                    <div class="container">
                        <h1 class="display-3">Hello!</h1>
                        <p>Welcome to the App</p>
                        <p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more &raquo;</a></p>
                    </div>
                </div>

              
                <h2>
                    Open Issues
                </h2>
                <div class="table-responsive">
                 <table class="table table-striped-jay">
                     <thead>
                     <tr>
                     <th>#</th>
                     <th>Topic</th>
                     <th>issuecontent</th>
                     </tr>
                     </thead>
                     <tbody>
                     {this.display()}
                     </tbody>
                 </table>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getIssue : (data) => dispatch(getIssue(data)),
        resolveIssue: (data) => dispatch(resolveIssue(data))


    };
}

function mapStateToProps(state) {
    const issues = Object.keys(state.openissues).map((items) => (
        {
            'issues' : state.openissues[items]


        }
    ));

    return {issues};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(User));

//export default User;