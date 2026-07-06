import { usePasscodeStyleStore } from "@/stores/passCodeStyleStore";
import Bullet from "./Bullet";
import KeypadNumber from "./KeypadNumber";

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "delete"];

export default function PreviewPasscode() {
  const background = usePasscodeStyleStore(
    (state) => state.background
  )

  const titleLabel = usePasscodeStyleStore(
    (state) => state.titleLabel
  )
  const passcode = usePasscodeStyleStore(
    (state) => state.passcode
  )

  return (
    <div className="relative w-full h-full rounded-2xl
      items-center justify-center flex flex-col">
      <div className="w-full h-12 bg-black rounded-t-2xl"
        style={{ backgroundColor: background.backgroundColor, }} />
      <div className="flex-1 w-full flex flex-col items-center justify-center gap-2"
        style={{
          backgroundImage: `url(${background.backgroundImage})`,
          backgroundSize: '100% auto',
          backgroundPosition: 'center',
          color: titleLabel.textColor,
        }}>
        <p className="text-xl" >비밀번호</p>
        <p className="font-thin">카카오톡 암호를 입력해주세요.</p>
        {/* 불렛 */}
        <section className="grid grid-cols-4 gap-2 mt-4">
          <Bullet filled
            emptyImage={passcode.bulletFirstImage}
            filledImage={passcode.bulletSelectedFirstImage} />
          <Bullet filled
            emptyImage={passcode.bulletSecondImage}
            filledImage={passcode.bulletSelectedSecondImage} />
          <Bullet
            emptyImage={passcode.bulletThirdImage}
            filledImage={passcode.bulletSelectedThirdImage} />
          <Bullet
            emptyImage={passcode.bulletFourthImage}
            filledImage={passcode.bulletSelectedFourthImage} />
        </section>
      </div>
      {/* 키패드 */}
      <div className="flex w-full h-52 items-center justify-center p-4 rounded-b-2xl"
        style={{ backgroundColor: passcode.keypadBackgroundColor, }} >

        <div className="grid grid-cols-3 gap-x-10">
          {KEYS.map((key, i) => (
            <div key={i} className="relative"
              style={{ color: passcode.keypadTextNormalColor }}>
              {i === 4 && (
                <img
                  src={passcode.keypadNumberHighlightedImage}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              )}
              <KeypadNumber value={key} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
