import styled from 'styled-components'

export const ProfileContainer = styled.div`
    padding-left: 100px;
    padding-right: 100px;
    display: flex;

    @media (max-width: 760px) {
        padding-left: 0px;
        padding-right: 0px;
        display: block !important;
    }
`

export const ProfileInfo = styled.div`
    margin-right: 20px;
    

    @media (max-width: 760px) {
        display: flex;
        width: 100%;
    }
`

export const ProfileImage = styled.div`
    img {
        width: 100%;
        object-fit: cover;
        border-radius: 4px;
        max-width: 240px;

        margin-right: 20px;
        margin-bottom: 20px;
    }

    @media (max-width: 760px) {
        width: 35%;
        padding-right: 20px;
    }
`

export const CountrySpan = styled.span`
   color: #999;
   font-size: 18px;
`

export const ProfileContent = styled.div`
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 4px;
    width: 100%;
`