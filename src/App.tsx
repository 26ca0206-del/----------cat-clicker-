import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UPGRADE_ITEMS } from './constants';
import { Heart, MousePointerClick, Clock, ShoppingCart, Info } from 'lucide-react';

export default function App() {
  // 1. スコア管理：愛ポイント、所持アイテム数のステート
  const [lovePoints, setLovePoints] = useState<number>(0);
  const [itemCounts, setItemCounts] = useState<Record<string, number>>({});
  
  // クリック時の浮遊アニメーション用
  const [floatingTexts, setFloatingTexts] = useState<{ id: number, x: number, y: number, amount: number }[]>([]);

  // 計算式：現在のクリックパワーと自動加算パワーの算出
  const { clickPower, autoPower } = useMemo(() => {
    let cp = 1;
    let ap = 0;
    UPGRADE_ITEMS.forEach(item => {
      const count = itemCounts[item.id] || 0;
      if (count > 0) {
        if (item.effectType === 'クリック') {
          cp += item.baseEffect * count;
        } else {
          ap += item.baseEffect * count;
        }
      }
    });
    return { clickPower: cp, autoPower: ap };
  }, [itemCounts]);

  // 3. 自動加算処理：1秒ごとに「自動獲得ポイント」を加算
  useEffect(() => {
    if (autoPower > 0) {
      const timer = setInterval(() => {
        setLovePoints(prev => prev + autoPower);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [autoPower]);

  // アイテムの現在の価格を計算（1.15倍ずつ増加）
  const getNextCost = useCallback((baseCost: number, currentCount: number) => {
    return Math.floor(baseCost * Math.pow(1.15, currentCount));
  }, []);

  // 2. クリック処理：画面中央の猫をクリックした際のアクション
  const handleCatClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // クリック位置を取得して浮遊エフェクトを追加
    const rect = e.currentTarget.getBoundingClientRect();
    // ボタン内での相対座標を維持しつつ少しランダムに散らす
    const randomOffsetX = (Math.random() - 0.5) * 60;
    const randomOffsetY = (Math.random() - 0.5) * 40;
    
    // イベント座標から表示位置を作成
    const clickX = e.clientX + randomOffsetX;
    const clickY = e.clientY + randomOffsetY;

    setLovePoints(prev => prev + clickPower);

    const newId = Date.now() + Math.random();
    setFloatingTexts(prev => [...prev, { id: newId, x: clickX, y: clickY, amount: clickPower }]);

    // 1秒後に浮遊エフェクトを削除
    setTimeout(() => {
      setFloatingTexts(prev => prev.filter(ft => ft.id !== newId));
    }, 1000);
  };

  // 4. アイテム購入処理
  const handleBuyItem = (itemId: string, cost: number) => {
    if (lovePoints >= cost) {
      setLovePoints(prev => prev - cost);
      setItemCounts(prev => ({
        ...prev,
        [itemId]: (prev[itemId] || 0) + 1
      }));
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 flex flex-col md:flex-row overflow-hidden font-sans">
      
      {/* 画面左側：プレイエリア（猫のクリック） */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-orange-50/50 border-r border-orange-100 relative">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-orange-600 drop-shadow-sm flex items-center justify-center gap-3">
            <Heart className="w-10 h-10 md:w-12 md:h-12 fill-orange-500" />
            {Math.floor(lovePoints).toLocaleString()}
          </h1>
          <p className="text-stone-500 font-medium tracking-widest mt-2 uppercase text-sm">愛ポイント</p>
        </div>

        {/* 
          ▼ 猫の画像変更場所 ▼
          初心者の方向け: 以下の <button> の中のテキスト(`🐱`) を `<img>` タグ等に 
          置き換えることで、好きな猫の画像に変更することができます。
          例: <img src="/cat.png" alt="ネコ" className="w-64 h-64 object-contain pointer-events-none" />
        */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCatClick}
          className="relative text-[160px] md:text-[200px] leading-none focus:outline-none focus-visible:ring-4 ring-orange-400 rounded-full select-none"
        >
          <div className="drop-shadow-2xl"><img src ="/image_3fb71f1d.png" alt="ネコ"className="w-64 h-64 object-contain pointer-events-none" /></div>
        </motion.button>
        {/* ▲ ここまで ▲ */}

        <div className="mt-16 flex gap-8 border-t border-orange-200/50 pt-8 w-full max-w-sm px-6">
          <div className="flex-1 text-center">
            <div className="flex items-center justify-center gap-2 text-stone-500 mb-1">
              <MousePointerClick className="w-5 h-5 text-orange-400" />
              <span className="text-sm font-semibold">クリック</span>
            </div>
            <p className="text-2xl font-bold text-stone-700">+{clickPower.toLocaleString()}</p>
          </div>
          <div className="flex-1 border-l border-orange-200/50 text-center">
            <div className="flex items-center justify-center gap-2 text-stone-500 mb-1">
              <Clock className="w-5 h-5 text-teal-500" />
              <span className="text-sm font-semibold">毎秒</span>
            </div>
            <p className="text-2xl font-bold text-stone-700">+{autoPower.toLocaleString()}</p>
          </div>
        </div>

        {/* クリック時の浮遊数字エフェクト */}
        <AnimatePresence>
          {floatingTexts.map(ft => (
            <motion.div
              key={ft.id}
              initial={{ opacity: 1, y: 0, scale: 0.8 }}
              animate={{ opacity: 0, y: -100, scale: 1.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="pointer-events-none fixed z-50 text-3xl font-black text-orange-500 drop-shadow-md select-none flex items-center gap-1"
              style={{ left: ft.x, top: ft.y, pointerEvents: 'none', transform: 'translate(-50%, -50%)' }}
            >
              <Heart className="w-6 h-6 fill-orange-500" />
              +{ft.amount.toLocaleString()}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 画面右側：ショップ（アップグレードアイテム一覧） */}
      <div className="w-full md:w-[480px] lg:w-[540px] flex flex-col h-screen bg-white shadow-xl z-10">
        <div className="bg-stone-800 text-stone-100 p-6 shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-6 h-6" />
            <h2 className="text-xl font-bold tracking-wide">ショップ</h2>
          </div>
          <div className="bg-stone-700 px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2">
            <Heart className="w-4 h-4 fill-orange-500 text-orange-500" />
            {Math.floor(lovePoints).toLocaleString()}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {UPGRADE_ITEMS.map((item) => {
            const count = itemCounts[item.id] || 0;
            const cost = getNextCost(item.baseCost, count);
            const canAfford = lovePoints >= cost;

            return (
              <button
                key={item.id}
                onClick={() => handleBuyItem(item.id, cost)}
                disabled={!canAfford}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex flex-col gap-3 group
                  ${canAfford 
                    ? 'border-orange-200 bg-white hover:bg-orange-50 hover:shadow-md cursor-pointer active:scale-[0.99]' 
                    : 'border-stone-100 bg-stone-50/50 opacity-60 cursor-not-allowed'
                  }
                `}
              >
                <div className="flex justify-between items-start w-full">
                  <div>
                    <h3 className="text-lg font-bold text-stone-800 group-hover:text-orange-700 transition-colors">
                      {item.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                      <span className="px-2 py-0.5 rounded text-xs font-semibold bg-stone-200 text-stone-600">
                        {item.category}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold
                        ${item.effectType === 'クリック' ? 'bg-orange-100 text-orange-600' : 'bg-teal-100 text-teal-600'}
                      `}>
                        {item.effectType} +{item.baseEffect.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className={`font-black text-lg flex items-center gap-1 ${canAfford ? 'text-orange-500' : 'text-stone-400'}`}>
                      <Heart className="w-4 h-4" />
                      {cost.toLocaleString()}
                    </span>
                    <span className="text-stone-500 text-sm font-medium">
                      所持: {count}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 bg-stone-100/50 p-2.5 rounded-lg border border-stone-100">
                  <Info className="w-4 h-4 text-stone-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-stone-500 leading-snug">
                    {item.flavorText}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

