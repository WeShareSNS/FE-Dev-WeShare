import MyPageContainer from '@/components/MyPage/MyPageContainer';
import UserInfo from '@/components/MyPage/UserInfo';

export default function Page() {
  return (
    <div className="flex flex-col items-center py-12">
      <UserInfo />
      <MyPageContainer />
    </div>
  );
}