# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Git Workflow

After completing any meaningful unit of work, commit and push to GitHub so progress is never lost:

```bash
git add <files>
git commit -m "short descriptive message"
git push origin main
```

**Commit often** — after adding a feature, fixing a bug, or making any notable change. Use clear, specific commit messages (e.g. `"add splitter enemy death animation"`, not `"update stuff"`). Do not batch unrelated changes into one commit.

Remote: https://github.com/Qinzilei/claudebot_setup

## Running the Games

No build step required. Open the HTML files directly in a browser:

- **Shooter:** `open shooter.html`
- **Tic Tac Toe:** `open tictactoe.html`

## Architecture

Two standalone, dependency-free HTML5 Canvas games — all logic, styles, and markup are self-contained within each `.html` file.

### shooter.html (~750 lines)

A wave-based top-down arcade shooter built on the HTML5 Canvas 2D API.

**Game state machine:** `MENU → PLAYING → WAVE_COMPLETE → LEVEL_COMPLETE → GAME_OVER`

**Key sections (in order):**
- **Config (line ~36):** Central tuning object for speeds, fire rates, HP values — change game balance here.
- **Input (line ~48):** Keyboard (WASD/arrows) and mouse (aim/shoot) handlers.
- **Enemy types (line ~69):** `WALKER`, `CHARGER`, `TANK`, `SHOOTER`, `SPLITTER` — each has unique AI in the `Enemy` class.
- **Level data (line ~80):** Wave definitions with enemy type/count arrays.
- **Classes:** `Bullet` → `Enemy` → `Player` in that order.
- **Game loop (line ~559):** Single `update()` + `render()` rAF loop handling physics, collision (circular hitboxes via distance), state transitions, and particle effects.

**Collision detection** uses distance-based circular hitboxes throughout (no AABB).

**Enemy AI** is type-dispatched inside `Enemy.update()` — charger uses a dash cooldown pattern, shooter fires on a timer, splitter spawns child enemies on death.

### tictactoe.html (~176 lines)

Simple DOM-based Tic Tac Toe with score tracking across games. Board state is a flat 9-element array; win detection checks 8 hardcoded combinations.
