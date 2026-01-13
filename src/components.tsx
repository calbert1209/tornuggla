import type { Question, GameState } from './game'

interface HeaderProps {
  state: GameState;
  showCharacter: boolean;
}

export function Header({ state, showCharacter }: HeaderProps) {

  return (
    <header>
      <div class="header-content">
        <div class="count">{state.count}</div>
        {Array.from({ length: state.count }, (_, i) => (
          <CharacterImage key={i} animate={showCharacter} />
        ))}
      </div>
    </header>
  )
}


const CharacterImage = ({ animate }: { animate: boolean }) => {
  const assetBase = import.meta.env.BASE_URL
  return (
    <img
      src={
        animate
          ? `${assetBase}assets/pikachu.gif`
          : `${assetBase}assets/pikachu-static.gif`
      }
      alt="pikachu"
      class="character"
    />);
}
interface StageProps {
  question: Question;
  operator: '+' | '-';
}

export function Stage({ question, operator }: StageProps) {
  return (
    <main class="stage">
      <div class="number left">{question.a}</div>
      <div class="operator">{operator}</div>
      <div class="number right">{question.b}</div>
    </main>
  )
}

interface FooterProps {
  onNG: () => void;
  onOK: () => void;
  onReset: () => void;
  onSwap: () => void;
}

export function Footer({ onNG, onOK, onReset, onSwap }: FooterProps) {
  return (
    <footer>
      <button class="primary" onClick={onNG}>
        NG (x)
      </button>
      <button class="primary" onClick={onOK}>
        OK (c)
      </button>
      <button class="secondary" onClick={onReset}>
        RESET (r)
      </button>
      <button class="secondary" onClick={onSwap}>
        SIGN (-)
      </button>
    </footer>
  )
}
