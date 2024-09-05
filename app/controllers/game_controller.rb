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
    binding.pry()
  end
  
  def tsumo
    binding.pry()
    @foo = 1
    render :result
    # 牌順から1つ減らす。
    # @current_total_paijun
    # 牌順から1つ取り出した牌は手牌の一番右に表示する。
  end
end
