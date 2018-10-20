import React, {Component} from "react"
// import Img from "gatsby-image"
import styled from "styled-components";

const CommentContainer = styled.div`
display:block;
width:100%;
margin-bottom: 25px;
`;

const Content = styled.div`
padding: 0 0 15px 35px;
position: relative;
clear: both;
font-size: 13px;
padding: 5px 0;
border: none;
`;

const Author = styled.div`
display:block;
`;
const Date = styled.div`
font-size:13px;
color: #888;
`;
const Avatar = styled.div`
display:inline-block;position: relative;
z-index: 2;
border-radius: 200px;
overflow: hidden;
float: right;
width: 48px;

height: 48px;
`;
const Header = styled.div`
display:block;
position: relative;
z-index: 2;
overflow: hidden;
padding-top: 8px;
div{
line-height:20px;
}
`;

const InnerContainer = styled.div`
margin: 0 70px 0 0;
`

const Reply = styled.button`
color: #29b6f6;
float: left;
position: absolute;
left: 20px;
top: 20px;
border: 1px solid #0086c3b3;
padding: 1px 9px;
border-radius: 1px;
cursor: pointer;
box-shadow: 0px 0px 3px 0px rgba(42, 183, 246, 0.59);
font-weight: 300;
background-color:#fff;
font-family: inherit;
transition: all linear 0.1s;
:hover{
color: #005b9f;
border-color: #005b9f;

}
}
`
const Children = styled.div`
margin: 20px 45px 0 0;
`

class Comment extends Component {


    Inserter() {
        const id = this.props.id
        const data = this.props.data.find(x => x.id === id)
        let IsEnd;

        if (this.props.ParentsId[id].length === 0) {
            IsEnd = 1
        }
        return (
            <CommentContainer>

                <Avatar><img src={data.author_avatar_urls["48"]} alt=""/></Avatar>
                <InnerContainer>
                    <Header>
                        <Author>{data.author_name}</Author>
                        <Date>19/12/1375</Date>
                        <Reply>پاسخ</Reply>
                    </Header>
                    <Content dangerouslySetInnerHTML={{__html: data.content.rendered}}/>
                </InnerContainer>
                {IsEnd ? null : this.props.ParentsId[id].map((id) =>
                    <Children key={id}>
                        <Comment id={id} ParentsId={this.props.ParentsId} data={this.props.data} key={id}/>
                    </Children>)}
            </CommentContainer>
        )


    }

    render() {
        return (
            <div>
                {this.Inserter()}
            </div>
        )
    }
}

export default Comment;