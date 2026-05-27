import Bullet from "./Bullet";
import KeypadNumber from "./KeypadNumber";

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "delete"];

export default function PreviewPasscode() {


  return (
    <div className="w-[90%] max-w-[330px] aspect-[390/700] 
      border border-gray-300 rounded-2xl p-1 text-xs">
      <div className="relative w-full h-full rounded-2xl bg-gray-200
      items-center justify-center flex flex-col ">
        <div className="flex-1 w-full h-full flex flex-col items-center justify-center gap-2
        bg-gray-300 rounded-t-2xl">
          <p className="text-xl">비밀번호</p>
          <p>카카오톡 암호를 입력해주세요.</p>
          {/* 불렛 */}
          <section className="grid grid-cols-4 gap-2 mt-4">
            <Bullet filled />
            <Bullet filled />
            <Bullet />
            <Bullet />
          </section>
        </div>
        {/* 키패드 */}
        <section>
          <div className="flex w-full items-center justify-center p-4">
            <div className="grid grid-cols-3 gap-x-8">
              {KEYS.map((key, i) => (
                <KeypadNumber key={i} value={key} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
