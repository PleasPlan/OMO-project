# **OMO-project**
### :sparkles: FE & BE 협업 프로젝트 :sparkles:


<img width="300" alt="스크린샷 2024-09-25 오후 2 22 10" src="https://github.com/user-attachments/assets/4d0e7308-3f6c-46c1-8cf7-387ccc2fad81">


<br>

### 서비스 링크 : https://www.oneulmohae.co.kr/

<br>

## 💻 프로젝트 소개

- 사용자들이 장소를 고려해서 자신만의 놀이 코스를 생성할 수 있게끔 다양한 정보를 제공해주고, 커뮤니티 기능을 통해 다양한 의견을 공유할 수 있게 하는 일정관리 및 커뮤니티 웹사이트

<br>

## ⌛ 개발 기간

- 2023.07 ~ing

<br>

## :information_desk_person: TYING 프로젝트의 구성원
- 황혜인, 조성찬, 홍승현, 이호준, 황제현

<br>

## :globe_with_meridians: 개발환경

- 개발 언어: Html, Css, JavaScript, Java
- 사용 기술: React, Spring Boot, MySQL
- 배포 : AWS EC2, Vercel
- 버전 관리 및 협업 : Git, Github, Figma, Discord, Confluence, Notion, SpreadSheets

<br>

## 📌 기획 동기 
- 사용자가 설정한 위치를 기반으로 카테고리 별 장소 정보를 제공하고, 이를 활용해 개인화된 일정 및 코스를 생성하며, 커뮤니티 기능을 통해 사용자 간 의견을 공유할 수 있는 웹 플랫폼의 필요성을 인식하고 이를 개발하게 되었습니다.

<br>

## 📌 웹 사이트 주요 기능 및 목표
- 먹거리, 볼거리, 놀거리, 카페 등 여가활동 정보를 설정된 위치 기반으로 장소 상세 정보 제공
- 장소 상세페이지에서 관심/추천/리뷰 기능,주소, 전화번호, 카카오맵, MBTI별 추천 통계, 더보기 카카오 장소 URL 제공 
- 커뮤니티(자유, 고민 게시판)를 통해 사용자들의 정보 및 의견 공유 장을 제공 
- 사용자의 관심/추천/최근본 장소를 기반으로한 나만의 코스 작성 기능
- 나만의 코스를 커뮤니티 게시판에 공유 가능, MBTI 기반으로한 나만의 코스 필터링 기능 제공 (MBTI별 pick)
- 문의게시판(자주하는 질문, QnA) 및 공지사항을 통해 사용자 편의성 증대
- 카카오, 네이버, 구글 3가지의 다양한 로그인 방식 제공

<br>
 
## 📌 웹 사이트 사용 예시

<br>


## 1. 메인 페이지 검색창
- 사용자가 위치 허용을 안할 시, 허용하도록 alert창을 통해 알립니다.
- 사용자가 위치 허용 시, 자동으로 사용자의 현재 위치를 불러오고, 현재 위치를 기반으로 한 장소 데이터를 불러옵니다.
- 도로명 주소를 검색 시, 검색된 주소를 기반으로 한 장소 데이터로 변경됩니다.
  
<br>

https://github.com/user-attachments/assets/79a4c022-3fbd-40a3-8af0-773c489a1037

<br>

## 2. 위치 기반 카테고리 별 장소 리스트
- 카테고리를 대분류-소분류 별로 나눠서 장소 리스트를 보여줍니다.
- 장소 리스트는 메인페이지에서 설정한 위치를 기반으로 보여줍니다.
- 검색 필터링 기능을 통해 상점 이름을 검색하여 장소를 필터링할 수 있습니다.
  
<br>
 
https://github.com/user-attachments/assets/eb3083e4-d498-4ae0-ba2f-5e64cd4bf973

<br>

## 3. 장소 상세 페이지 
- 관심(하트)을 누르면, 사용자의 "관심목록"에 해당 장소 데이터가 저장됩니다.
- 리뷰를 먼저 작성하면, 추천(따봉)을 누를 수 있게 되고, 사용자의 "추천한 장소"에 해당 장소 데이터가 저장됩니다.
- 카카오맵을 통해 지도를 확대/축소할 수 있고, 드래그, 큰지도보기, 길찾기도 가능합니다.
- MBTI별 추천 통계를 통해 추천한 사람들의 성향을 퍼센트로 알 수 있습니다.
- 리뷰에는 사진/글 업로드가 가능하며, 리뷰로 작성된 사진은 썸네일로 등록되어, 리스트 페이지에도 보이게 됩니다. 
- 더보기 URL을 통해 카카오 장소 상세페이지로 이동하여 더 많은 정보를 볼 수 있습니다.
  
<br>

https://github.com/user-attachments/assets/a9c2c861-5be0-4320-b5aa-9b5b504534e1

<br>

## 4. 커뮤니티 고민/자유 게시판
- 글쓰기 버튼을 통해 글 작성이 가능합니다.
- 게시글에는 제목, 닉네임, 작성 날짜, 내용, 좋아요/댓글 수가 나타납니다.
- 좋아요를 통해 공감이 가능합니다.
- 댓글을 통해 의견을 공유할 수 있습니다.


<br>

https://github.com/user-attachments/assets/43254ca4-0ebb-48d9-b116-1039352c112d

<br>

https://github.com/user-attachments/assets/67eb3847-6550-4c7b-ba60-c88b2339d83f

<br>


https://github.com/user-attachments/assets/31a25f99-0e8a-4d19-a9a8-2c65ef3ed606


<br>


## 5. 커뮤니티 게시판 신고
- 부적절한 게시글은 신고할 수 있습니다. (신고버튼은 내 게시글에는 안뜨고, 다른사람이 쓴 게시글에만 뜹니다.)

<br>

https://github.com/user-attachments/assets/aed995b7-85b1-42ee-a3bd-48e51a84d463

<br>


## 6. 나만의 코스 작성 및 커뮤니티 공유
- 글쓰기 버튼을 통해 글 작성이 가능합니다.
- 관심/추천/최근 본 목록에서 장소를 선택해서 코스 및 일정을 만들 수 있습니다.
- 개별 장소마다 날짜 및 시간 설정이 가능합니다.
- 글쓰기를 완료하면 나만의 코스에 뜨고 여기서는 글쓴이만 볼 수 있습니다.
- 해당 코스 상세 페이지에서 커뮤니티 공유 버튼을 누르면 나만의 코스 커뮤니티에 공유가 되고, 공유 취소도 가능합니다.

<br>

https://github.com/user-attachments/assets/9e03976c-a4fd-43de-8b9c-aaab07a7bab7

<br>

https://github.com/user-attachments/assets/b9c97326-d190-455c-a283-8f3e8087cd08

<br>

## 7. 나만의 코스 커뮤니티 
- 다른 사람이 공유한 코스 상세 페이지를 볼 수 있으며, 코스 내의 장소를 클릭하면 해당 장소상세페이지로 이동하여 볼 수 있습니다.
- MBTI별 pick을 통해 I/E, J/P 성향을 필터함으로써, 성향에 따른 맞춤형 코스를 볼 수 있습니다.
- 따봉 버튼을 통해 코스 추천이 가능합니다.
- 부적절한 게시글은 신고할 수 있습니다. (신고버튼은 내 게시글에는 안뜨고, 다른사람이 쓴 게시글에만 뜹니다.)

<br>

https://github.com/user-attachments/assets/9f4a8c32-0df1-4275-8e73-b73ae7311cef

<br>

https://github.com/user-attachments/assets/15fc2d7b-af76-45fb-87b2-c91b57ffeef8

<br>

## 8. 마이페이지 
- "내정보"에서는 사용자의 회원정보와 관심/추천/글/코스의 개수를 볼 수 있습니다.
- "관심목록"에서는 장소 상세페이지에서 관심목록(하트 버튼을 누른 것들)을 볼 수 있습니다.
- "추천한 장소"에서는 장소 상세페이지에서 추천목록(따봉 버튼을 누른 것들)을 볼 수 있습니다.
- "내가 쓴글"에서는 커뮤니티 게시판에서 작성한 글들을 볼 수 있습니다.
- "프로필 설정"에서는 프로필/닉네임/MBTI 변경, 회원 탈퇴가 가능합니다.

<br>

https://github.com/user-attachments/assets/a99a5f51-0b17-46ec-9f29-13685c9c8010

<br>

## 9. 로그인 및 회원 추가 정보 입력
- OAuth2 인증 방식을 통해 카카오, 네이버, 구글 로그인을 할 수 있습니다.
- 프로필 사진은 해당 서비스(카카오, 네이버, 구글)의 기본 프로필로 등록됩니다.
- 회원 추가 정보를 입력하지 않으면 몇몇 서비스 이용이 제한됩니다. (관심/추천버튼, 리뷰, 커뮤니티 글 작성/댓글 등)
- 일정 시간이 지나 인증 토큰 만료되면, 토큰이 자동 갱신됩니다.
- 회원 가입 후 재로그인 시에는, 회원추가입력을 하지 않아도, 과거 이용 내역이 그대로 남은 상태로 바로 서비스 이용이 가능합니다.

<br>


https://github.com/user-attachments/assets/632ec7d7-70a8-49b0-a5d9-b3ad4b87c8dd



<br>

https://github.com/user-attachments/assets/389aeecc-0a31-4e47-9d25-fd148ab438c2

<br>

## 10. GUEST 및 로그아웃 회원 처리

- 사용자가 회원 정보를 입력하지 않고 웹을 이용할 경우, 서버에서 이를 "GUEST"로 판단하여 오류 코드를 반환하고, 회원 정보 입력 페이지로 redirect 합니다.
- 로그아웃 유저가 사용할 수 있는 기능을 제한하기 위해서, 로그아웃 상태에서 특정 기능 이용 시 자동으로 로그인 페이지로 redirect 합니다.

<br>

https://github.com/user-attachments/assets/adeef669-605c-4a26-8230-1b574fb8b1c1

<br>

https://github.com/user-attachments/assets/dbedc871-2d43-48ca-8658-c84f19107fe8

<br>


