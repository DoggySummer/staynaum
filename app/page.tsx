import { Card, Input, Checkbox, Label, Switch, Button } from "@ui";

export default function Home() {
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <Card.Card className="w-[30rem]">
        <Card.CardHeader>
          <Card.CardTitle>로그 인</Card.CardTitle>
        </Card.CardHeader>
        <Card.CardContent className="flex flex-col gap-y-2 pb-4">
          <Input placeholder="아이디를 입력하세요." />
          <Input placeholder="비밀번호를 입력하세요" type="password" />
        </Card.CardContent>
        <Card.CardFooter className="block">
          <div className="w-full flex justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="keep" />
              <Label htmlFor="keep">로그인 유지하기</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="id-security">IP 보안</Label>
              <Switch id="ip-security" />
            </div>
          </div>
          <Button className="w-full">로그인</Button>
        </Card.CardFooter>
      </Card.Card>
    </main>
  );
}
