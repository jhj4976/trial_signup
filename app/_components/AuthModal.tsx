import styles from "./AuthModal.module.css"
import Lottie from "react-lottie-player"
import check from "@/public/imgs/common/check.json"
type CommonModal = {
  closeModalHandler: any
  userType: boolean // 개인/기업
  isSuccess: boolean // 성공/실패
  modalType: string // 모달 타입 ex.회원가입 성공/실패, 이메일/비밀번호 찾기...
  userEmail: string // 이메일 찾기에서만 사용
  userName: string //
}
export default function AuthModal({
  userType,
  isSuccess,
  modalType,
}: CommonModal) {
  return (
    <section className={styles.authModalSection}>
      <article className={styles.authModal}>
        <div className={styles.contentsWrapper}>
          <div className={styles.contents}>
            {modalType === "SIGNUP" &&
              (isSuccess ? (
                userType ? (
                  <>
                    <Lottie
                      loop
                      animationData={check}
                      play
                      style={{ width: 180, height: 180, marginBottom: "24px" }}
                    />
                    <p className={styles.title}>회원가입 완료!</p>
                    <p className={styles.desc}>
                      맵시 내비게이션 앱에서 로그인해주세요
                    </p>
                    <p className={styles.desc2}>
                      *확인 완료 시 해당 창을 닫아주세요
                    </p>
                  </>
                ) : (
                  <>
                    <Lottie
                      loop
                      animationData={check}
                      play
                      style={{ width: 180, height: 180, marginBottom: "24px" }}
                    />
                    <p className={styles.title}>가입 신청 완료!</p>
                    <p className={styles.desc}>
                      가입 승인 시 문자 또는 메일로 연락드리며 영업일 기준 최대
                      2일이 소요될 수 있습니다.
                    </p>
                    <p className={styles.desc2}>
                      *확인 완료 시 해당 창을 닫아주세요
                    </p>
                  </>
                )
              ) : (
                <>
                  <p>이미 가입된 회원입니다</p>
                  <button
                    type="button"
                    onClick={() => (window.location.href = "/")}>
                    확인
                  </button>
                </>
              ))}
          </div>
        </div>
      </article>
    </section>
  )
}
