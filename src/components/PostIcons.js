import {graphql} from "gatsby"
import React from "react"
import dateSvg from "../images/calendar.svg";
import {toJalaali} from 'jalaali-js'
import styled from "styled-components";

const PostDetail = styled.div`
    text-align: center;
    font-weight: 300;
    font-size: 15px;
    line-height: 60px;
    img {
        width: 15px;
        color: red;
    }
`;

class PostIcons extends React.Component {
    monthToString(monthInt) {
        switch (monthInt) {
            case 1:
                return ("فروردین");
            case 2:
                return ("اردیبهشت");
            case 3:
                return ("خرداد");
            case 4:
                return ("تیر");
            case 5:
                return ("مرداد");
            case 6:
                return ("شهریور");
            case 7:
                return ("مهر");
            case 8:
                return ("آبان");
            case 9:
                return ("آذر");
            case 10:
                return ("دی");
            case 11:
                return ("بهمن");
            case 12:
                return ("اسفند");
            default:
                return ("")
        }
    }

    render() {
        let date;
        try {
            date = (this.props.node.date).split(',')
        } catch (e) {
            date = "2019,1,1".split(',');

        }
        const jalali = toJalaali(Number(date[0]), Number(date[1]), Number(date[2]));
        return (
            <PostDetail>
                                <span>
                                    <img width='15px' height='15px' src={dateSvg} alt="date"/>
                                    {' '}
                                    {jalali.jd} {' '}
                                    {this.monthToString(jalali.jm)} {' '}
                                    {jalali.jy} {' '}
                                </span>
                {'\u00A0'}{'\u00A0'}
                {/*<span>*/}
                {/*<img src={commentSvg} alt="logo"/> {'\u00A0'}*/}
                {/*{node.comments} کامنت*/}
                {/*</span>*/}
            </PostDetail>
        )
    }
}

export default PostIcons

export const query = graphql`
    fragment PostIcons on wordpress__POST {
        date(formatString: "MMMM DD, YYYY")
        tags {
            name
        }
        categories {
            name
        }
    }
`;
