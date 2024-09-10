class GameController < ApplicationController
  def index
    #@paijun = majon_pais.sample(majon_pais.size)
  end
  
  def test
    tileAll = Tile.all()
    @rest_tiles = tileAll.sample(14 + 30)
    
    # sliceメソッドのびっくりマーク。
    #haipai = @rest_tiles.slice!(0..13)
    if Rails.cache.exist?('discard_tiles')
      Rails.cache.clear('discard_tiles')
    end
    
    @hand_tiles = @rest_tiles.slice!(0..12)
    @next_tile = @rest_tiles.slice!(0)
    
    Rails.cache.write('hand_tiles', @hand_tiles)
    Rails.cache.write('rest_tiles', @rest_tiles)
    
    if Rails.cache.exist?('discard_tiles')
      @discard_tiles = Rails.cache.read('discard_tiles')
    else
      @discard_tiles = Array.new()
    end
    #binding.pry()
  end
  
  # 牌の種類をデータベースに登録。
  # キーワードajax(非同期通信) rails jsファイル
  def discard
    @hand_tiles = Rails.cache.read('hand_tiles')
    @rest_tiles = Rails.cache.read('rest_tiles')
    @discard_tiles = Array.new()
    @next_tile = @rest_tiles.slice!(0)
    
    #binding.pry()
    if @next_tile.nil?
      @next_tile = Tile.find(params[:last_tile_id])
      @discard_tiles = Rails.cache.read('discard_tiles')
      
      flash.now[:danger] = "残りツモ回数がありません。あなたの負けです。"
    else
      @select_tile = Tile.find(params[:tile_id])
      if @hand_tiles.include?(@select_tile)
        @hand_tiles.delete(@select_tile)
        @hand_tiles.append(Tile.find(params[:last_tile_id]))
      end
      
      if Rails.cache.exist?('discard_tiles')
        @discard_tiles = Rails.cache.read('discard_tiles')
      end
      @discard_tiles.append(@select_tile)
      #binding.pry()
      
      Rails.cache.write('hand_tiles', @hand_tiles)
      Rails.cache.write('rest_tiles', @rest_tiles)
      Rails.cache.write('discard_tiles', @discard_tiles)
    end
    render :test
  end
  
  def result
    
  end
  
  def tsumo
    hand_tiles = Tile.find(params[:hand]).sort()
    if canWin(hand_tiles)
      redirect_to '/game/result', success: '和了判定'
    else
      redirect_to '/game/result', danger: 'チョンボ判定'
    end
    
    #render :result
    # 牌順から1つ減らす。
    # @current_total_paijun
    # 牌順から1つ取り出した牌は手牌の一番右に表示する。
  end
  
  def canWin(hand_tiles)
    # 手牌から雀頭候補リストを作成。
    # 雀頭を取り除き、面子候補を割り出す。
    
    hand_tiles_array = hand_tiles.map{ |tile| tile.value.to_s + tile.suit }
    pair_list = hand_tiles_array.filter{ |tile| hand_tiles_array.count(tile) > 1}.uniq
    
    pair_list.each do |pair_tile|
      # 雀頭を除いた手牌。
      tile_group = hand_tiles_array.clone
      tile_group[hand_tiles_array.index(pair_tile), 2] = []
      if isAllGroup(tile_group)
        return true
      end
    end
    
    
    return false
    # 和了ロジック
    # 1. 雀頭候補を割り出す。(oair)
    # 2. 刻子候補を割り出す。(triplets)
    # 3. 順子を割り出す。(sequences)
    
    # Tips 順子は一番多くなるため最後。
  end
  
  def isAllGroup(tile_group)
    # 刻子(同じ牌が3枚)リスト。
    triplets_list = tile_group.filter{ |tile| tile_group.count(tile) > 2}.uniq
    
    
  end
end
